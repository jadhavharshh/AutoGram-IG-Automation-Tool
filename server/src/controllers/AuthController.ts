import { Request, Response , NextFunction } from "express";
import jwt from 'jsonwebtoken';
import User from '../models/UserModel';
import { compare } from "bcrypt";

// Create Token
const createToken = (email : string, password : string) => {
    return jwt.sign({email, password}, process.env.JWT_SECRET as string, {expiresIn: '3d'})
}

export const SignUp = async (request : Request , response : Response , next : NextFunction) : Promise<void> => {
    console.log('Sign Up')

    
    try {
        const {email , password, confirmPassword} = request.body;
        console.log('email', email)
        console.log('password', password)
        console.log('confirmapssword', confirmPassword)
        const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+={}\[\]:;"'<>,.?/-]).{8,}$/;

        
        if(!passwordRegex.test(password)){
            response.status(400).json({message : 'Password must include at least one uppercase letter, one lowercase letter, one number, and one special character, and be at least 8 characters long'})
            return;
        }
        if(password !== confirmPassword){
            response.status(400).json({message : 'Password do not match'})
            return;
        }
        if(password.length < 8){
            response.status(400).json({message : 'Password must be atleast 8 characters long'})
            return;
        }

        const existUser = await User.findOne({email});
        if(existUser){
            response.status(400).json({message : 'User already exist'})
            return;
        }
        const user = await User.create({email, password});
        response.cookie("jwttoken", createToken(email, user.id), {
            maxAge: 3 * 24 * 60 * 60 * 1000, 
            secure: true,
            sameSite: "none",
        })
        response.status(201).json({
            user : {
                email : user.email,
                id : user.id
            }
        });
        return;

    } catch (error) {
        console.log(error)
    }
}

export const SignIn = async () => {
    console.log('Sign In')
}
