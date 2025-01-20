import { Request, Response , NextFunction } from "express";
import IGUser from "../models/IgUserModels";

// Add Instagram Account
export const AddIGAccount = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
    try {
        const { igUsername, igPassword } = request.body;
        const userId = request.userId;
        const isExist = await IGUser.findOne({ igUsername });
        if (isExist) {
            response.status(400).json({ message: "Instagram Account Already Exists" });
            return;
        }

        await IGUser.create({ igUsername, igPassword , userId }); // Updated to add to DB

        response.status(200).json({ message: "Instagram Account Added" });
        return;
    } catch (error) {
        // next(error);
        console.log("Error in AddIGAccount");
        console.log(error);
    }
}


export const GetIGAccounts = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
    try {
        const userId = request.userId;
        const igAccounts = await IGUser.find({ userId }).select('igUsername igPassword createdAt');
        response.status(200).json(igAccounts);
        return;
    } catch (error) {
        // next(error);
        console.log("Error in GetIGAccounts");
        console.log(error);
    }
}