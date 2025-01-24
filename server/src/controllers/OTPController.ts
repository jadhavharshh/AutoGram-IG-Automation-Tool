import { Request, Response , NextFunction } from "express";

export const sendOTP = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
    console.log('SEND OTP ROUTE HIT FOR FORGOT PAASSWORD')
    
};  