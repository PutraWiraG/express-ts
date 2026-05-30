import { Request, Response } from "express";
import { getAllUsers, createUser, updateUser, deleteUser, getUserById } from "../services/user.service.js";
import { catchAsync } from "../utils/catchAsync.js";
import { sendResponse } from "../utils/response.js"; // Import utilitas response

export const getUsers = catchAsync(async (req: Request, res: Response) => {
    const users = await getAllUsers();
    
    return sendResponse(res, 200, true, "Successfully get data users.", users);
});

export const storeUser = catchAsync(async (req: Request, res: Response) => {
    const user = await createUser(req.body);

    return sendResponse(res, 201, true, "Create user successfully.", user);
});

export const updateUserController = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params as { id: string };

    let user = await getUserById(id);
    if (!user) {
        return sendResponse(res, 404, false, "User not found.");
    }

    user = await updateUser(id, req.body);
    
    return sendResponse(res, 200, true, "Update data user successfully.", user);
});

export const deleteUserController = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params as { id: string };

    const user = await getUserById(id);
    if (!user) {
        return sendResponse(res, 404, false, "User not found.");
    }

    await deleteUser(id);
    
    return sendResponse(res, 200, true, "Delete user successfully.");
});

export const getDetailUser = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params as { id: string };

    const user = await getUserById(id);
    if (!user) {
        return sendResponse(res, 404, false, "User not found.");
    }

    return sendResponse(res, 200, true, "Get detail user successfully.", user);
});