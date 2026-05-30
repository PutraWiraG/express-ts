import prisma from "../config/database.js";

interface Data {
    title: string;
    writer: string;
    stock: number;
}

export const getAllBooks = async () => {
    return await prisma.book.findMany({
        orderBy: {
            title: "desc"
        }
    });
};

export const createBook = async (data: Data) => {
    return await prisma.book.create({
        data,
    });
};

export const updateBook = async (
    id: string,
    data: Data
) => {
    return await prisma.book.update({
        where: { id },
        data,
    });
};

export const deleteBook = async (id: string) => {
    return await prisma.book.delete({
        where: { id }
    });
};

export const findBookByID = async (id: string) => {
    return await prisma.book.findUnique({
        where: { id }
    });
};