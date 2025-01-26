import { Request, Response , NextFunction } from "express";

export const sendOTP2 = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
    console.log('SEND OTP ROUTE HIT FOR FORGOT PAASSWORD')
    const email = request.body.email;
    console.log(email)
    response.status(200).json({ message: 'OTP sent successfully' });
    
    return;
    
};  