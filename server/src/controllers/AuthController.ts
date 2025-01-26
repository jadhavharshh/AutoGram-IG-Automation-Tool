import { Request, Response , NextFunction } from "express";
import jwt from 'jsonwebtoken';
import User from '../models/UserModel';
import { compare } from "bcrypt";
import { sendOTP } from "./MailController";
import crypto from 'crypto';
import { sendOTPForgotPassword } from './MailController';

// Create Token
// Update the createToken function to include userId instead of password
const createToken = (email: string, userId: string) => {
    return jwt.sign({ email, userId }, process.env.JWT_SECRET as string, { expiresIn: '3d' })
}

// SignUp Function
export const SignUp = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
    console.log('Sign Up');

    try {
        const { email, password, confirmPassword } = request.body;
        // Validate input
        if (!email || !password || !confirmPassword) {
            response.status(400).json({ message: 'All fields are required.' });
            return;
        }

        if (password !== confirmPassword) {
            response.status(400).json({ message: 'Passwords do not match.' });
            return;
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            if (!existingUser.isVerified) {
                // User exists but not verified. Resend OTP.
                const newOtp = crypto.randomInt(100000, 999999).toString();
                const newOtpExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

                existingUser.otp = newOtp;
                existingUser.otpExpires = newOtpExpires;
                await existingUser.save();

                console.log("Resending OTP to existing unverified user.");

                // Send OTP via email (Do not await)
                sendOTP(email, newOtp).catch(error => {
                    console.error('Failed to send OTP:', error);
                });

                // Respond to client that OTP has been resent
                response.status(200).json({
                    message: 'OTP has been resent to your email. Please verify to complete registration.'
                });
                return;
            } else {
                // User exists and is verified
                response.status(400).json({ message: 'User already exists. Please log in.' });
                return;
            }
        }

        // Generate OTP and expiration
        const otp = crypto.randomInt(100000, 999999).toString();
        const otpExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

        // Create user with OTP
        const user = await User.create({ email, password, otp, otpExpires });
        console.log("SEND OTP FUNCTIONAL CALLED");

        // Send OTP via email (Do not await)
        sendOTP(email, otp).catch(error => {
            console.error('Failed to send OTP:', error);
        });

        // Respond to client that OTP has been sent immediately
        response.status(201).json({
            message: 'OTP sent to email. Please verify to complete registration.'
        });
        return;

    } catch (error: any) {
        console.log(error);
        if (!response.headersSent) { // Ensure response hasn't been sent
            response.status(500).json({ message: "INTERNAL SERVER ERROR" });
        }
    }
}

export const verifyOTP = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
    try {
        const { email, otp , type } = request.body;
        console.log(otp, type , email);   
        const user = await User.findOne({ email });

        // Check if user exists and OTP matches and is not expired
        if (!user || user.otp !== otp || !user.otpExpires || user.otpExpires < new Date()) {
            response.status(400).json({ message: 'Invalid or expired OTP.' });
            return; // Exit after sending response
        }
        
        
        if (type === 'signup') {
            // Mark user as verified for sign-up
            user.isVerified = true;
        } else if (type === 'resetPassword') {
            // Additional logic for password reset if needed
        }

        // Clear OTP fields and set isVerified to true
        user.otp = undefined;
        user.otpExpires = undefined;
        await user.save();

        if (type === 'signup') {
            // Generate JWT token
            const token = createToken(user.email, user.id);

            // Set cookie with JWT token
            response.cookie("jwttoken", token, {
                maxAge: 1 * 24 * 60 * 60 * 1000, // 1 days
                secure: true,
                sameSite: "none",
            });

            // Respond with user info
            response.status(200).json({
                message: 'OTP verified successfully. Your account is now verified.',
                user: {
                    email: user.email,
                    id: user.id,
                },
            });
        } else if (type === 'resetPassword') {
            // Respond with success message for password reset
            response.status(200).json({
                message: 'OTP verified successfully. You can now reset your password.',
            });

        } else {
            response.status(400).json({ message: 'Invalid verification type.' });
        }
        return; // Exit after sending response
    } catch (error: any) {
        console.log(error);
        if (!response.headersSent) { // Ensure response hasn't been sent
            response.status(500).json({ message: "INTERNAL SERVER ERROR" });
        }
    }
}

export const sendOTPForgotPasswordHandler = async (request: Request, response: Response) => {
    console.log("SEND OTP FORGOT PASSWORD HANDLER CALLED");
    const { email } = request.body;
    try {
        // Generate OTP and expiration
        const otp = crypto.randomInt(100000, 999999).toString();
        const otpExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

        // Find the user by email
        const user = await User.findOne({ email });
        if (!user) {
            response.status(404).json({ message: 'User not found.' });
            return;
        }

        // Update the user's OTP and expiration
        user.otp = otp;
        // console.log("THE NEW USER.OTP is", user.otp);
        user.otpExpires = otpExpires;
        await user.save();

        // Send OTP via email
        await sendOTPForgotPassword(email, otp);

        response.status(200).json({ message: 'OTP sent successfully' });
    } catch (error) {
        console.error('Failed to send OTP:', error);
        response.status(500).json({ error: 'Failed to send OTP' });
    }
};

export const resetPasswordHandler = async (request : Request , response : Response , next : NextFunction) : Promise<void> => {
    try {
        console.log('Reset Password Handler')
        const { email, newPassword, confirmPassword} = request.body;
        console.log("BACKEND DATA RECEIVED", email, newPassword, confirmPassword);
        // Validate input

        if(!email || !newPassword || !confirmPassword ){
            response.status(400).json({message : 'All fields are required'});
            return;
        }
        if(newPassword !== confirmPassword){
            response.status(400).json({message : 'Passwords do not match'});
            return;
        }
        const user = await User.findOne({email});
        if(!user){
            response.status(400).json({message : 'User does not exist'});
            return;
        }

        // Update user's password (pre-save hook will hash it)
        user.password = newPassword;

        // Clear OTP fields
        user.otp = undefined;
        user.otpExpires = undefined;
        await user.save();

        response.status(200).json({message : 'Password reset successfully. You can now log in with your new password.'});
        return;
    } catch (error) {
        response.status(400).json({message : 'INTERNAL SERVER ERROR'})
    }
};

export const SignIn = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
    try {
        const { email, password } = request.body;

        // Validate input
        if (!email || !password) {
            response.status(400).json({ message: 'All fields are required.' });
            return;
        }

        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            response.status(400).json({ message: 'User does not Exist.' });
            return;
        }

        // Check if user is verified
        if (!user.isVerified) {
            response.status(400).json({ message: 'Please verify your email before logging in.' });
            return;
        }

        // Compare password
        const isMatch = await compare(password, user.password);
        if (!isMatch) {
            response.status(400).json({ message: 'Invalid password.' });
            return;
        }

        // Generate JWT token
        const token = createToken(user.email, user.id);

        // Set cookie with JWT token
        response.cookie("jwttoken", token, {
            maxAge: 3 * 24 * 60 * 60 * 1000, 
            secure: true,
            sameSite: "none",
        });

        // Respond with user info
        response.status(200).json({
            message: 'Login successful.',
            user: {
                email: user.email,
                id: user.id
            }
        });
        return; // Exit after sending response
    } catch (error: any) {
        console.log(error);
        if (!response.headersSent) { // Ensure response hasn't been sent
            response.status(500).json({ message: "INTERNAL SERVER ERROR" });
        }
    }
}

export const getUserInfo = async (request : Request , response : Response , next : NextFunction) : Promise<void> => {
    console.log('Get User Info')
    try {
        const UserData = await User.findById(request.userId);
        if(!UserData){
            response.status(400).json({message : 'User does not exist'})
            return;
        }
        response.status(200).json({
            user : {
                email : UserData.email,
                id : UserData.id, 
            },
        });
        return;

    } catch (error) {
        console.log(error)
        response.status(500).json(
            {
                message : "INTERNAL SERVER ERROR"
            }
        )
    }
}


export const LogOut = async (request : Request , response : Response , next : NextFunction) : Promise<void> => {
    try {
        console.log('Log Out')
        response.clearCookie('jwttoken');
        response.status(200).json({message : 'Logged Out Successfully'});
        return;
    } catch (error) {
        response.status(400).json({message : 'INTERNAL SERVER ERROR'})
    }
};