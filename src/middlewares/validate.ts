import { Request, Response, NextFunction } from "express";
import { success, ZodSchema } from "zod";

export const validate = (schema: ZodSchema) => (req: Request, res: Response, next: NextFunction) => {
    try {
        
        req.body = schema.parse(req.body);
        next();

    } catch (error: any) {
        
        return res.status(400).json({
            success: false,
            message: error.issues[0].message,
            errors: error.issues
        })

    }
}