import { Request, Response , NextFunction } from "express";
import jwt from 'jsonwebtoken';
import User from '../models/UserModel';
import { compare } from "bcrypt";
import { sendOTP } from "./MailController";
import crypto from 'crypto';

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
        const { email, otp } = request.body;
        const user = await User.findOne({ email });

        // Check if user exists and OTP matches and is not expired
        if (!user || user.otp !== otp || !user.otpExpires || user.otpExpires < new Date()) {
            response.status(400).json({ message: 'Invalid or expired OTP.' });
            return; // Exit after sending response
        }

        // Clear OTP fields and set isVerified to true
        user.otp = undefined;
        user.otpExpires = undefined;
        user.isVerified = true; // Mark user as verified
        await user.save();

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
            message: 'OTP verified successfully.',
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
            response.status(400).json({ message: 'Invalid email or password.' });
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
            response.status(400).json({ message: 'Invalid email or password.' });
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