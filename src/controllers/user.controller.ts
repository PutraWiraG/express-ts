import { Request, Response } from "express";
import { getAllUsers, createUser, updateUser, deleteUser, getUserById } from "../services/user.service.js";

export const getUsers = async (req: Request, res: Response) => {
    try {
        
        const users = await getAllUsers();
        res.status(200).json({
            suucess: true,
            message: "Successfully get data users.",
            data: users
        });

    } catch (error) {
        
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Server Error.",
            error
        });

    }
}

export const storeUser = async (req: Request, res: Response) => {
    try {
        
        const user = await createUser(req.body);

        res.status(201).json({
            success: true,
            message: "Create user successfuly.",
            data: user
        });

    } catch (error: any) {
        
        console.log(error);

        res.status(500).json({
            success:false,
            message: "Internal server error."
        });

    }
}

export const updateUserController = async (req: Request, res: Response) => {
    try {
        
        const { id } = req.params as {id: string};

        let user = await getUserById(id);

        if(!user){
            return res.status(404).json({
                success: false,
                message: "User not found."
            });
        }

        user = await updateUser(id, req.body);

        return res.status(200).json({
            success: true,
            message: "Update data user successfully.",
            data: user
        });

    } catch (error: any) {
        
        console.log(error);

        return res.status(500).json({
            success: false,
            message: "Internal server error."
        });

    }
}

export const deleteUserController = async (req: Request, res: Response) => {
    try {

        const { id } = req.params as {id: string};

        const user = await getUserById(id);

        if(!user){
            return res.status(404).json({
                success: false,
                message: "User not found."
            });
        }

        await deleteUser(id);

        return res.status(200).json({
            success: true,
            message: "Delete user successfully."
        })

        
    } catch (error: any) {
        console.log(error);

        return res.status(500).json({
            success: false,
            message: "Internal server error."
        });
    }
}

export const getDetailUser = async (req: Request, res: Response) => {
    try {
        
        const { id } = req.params as {id: string};

        const user = await getUserById(id);

        if(!user){
            return res.status(404).json({
                success: false,
                message: "User not found."
            });
        }

        return res.status(200).json({
            success: true,
            message: "Get detail user successfully.",
            data: user
        });

    } catch (error: any) {
        console.log(error);

        return res.status(500).json({
            success: false,
            message: "Internal server error."
        });
    }
}