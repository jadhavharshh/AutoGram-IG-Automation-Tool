import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';

declare global {
    namespace Express {
        interface Request {
            userId: string;
        }
    }
}

export const verifyUser = (request: Request, response: Response, next: NextFunction) : void => {
    const token = request.cookies.jwttoken;

    if (!token) {
        response.status(401).json({ message: 'Unauthorized' });
        return;
    }

    jwt.verify(token, process.env.JWT_SECRET as string, (err: any, payload: any) => {
        if (err) {
            return response.status(401).json({ message: 'Unauthorized' });
        }
        request.userId = payload.userId;
        next();
    });
};