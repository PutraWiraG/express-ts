import { Request, Response, NextFunction } from "express";

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    console.error("--- ERROR LOGGED ---");
    console.error(err);

    // Kamu bisa kustomisasi status code berdasarkan tipe error di sini
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error.";

    return res.status(statusCode).json({
        success: false,
        message,
        ...(process.env.NODE_ENV !== 'production' && { error: err }) 
    });
};