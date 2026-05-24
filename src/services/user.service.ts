import prisma from "../config/database.js";

interface Data {
    name: string;
    email: string;
}

export const getAllUsers = async () => {
    return await prisma.user.findMany({
        orderBy: {
            registration_date: "desc",
        },
    });
};

export const createUser = async (data: Data) => {
    return await prisma.user.create({
        data,
    });
};

export const updateUser = async (
    id: string,
    data: Data
) => {
    return await prisma.user.update({
        where: { id },
        data
    });
}

export const deleteUser = async (id: string) => {
    return await prisma.user.delete({
        where: { id }
    });
}

export const getUserById = async (id: string) => {
    return await prisma.user.findUnique({
        where: { id }
    });
} 