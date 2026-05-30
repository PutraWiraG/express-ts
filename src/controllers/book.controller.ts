import { Request, Response } from "express";
import { getAllBooks, createBook, updateBook, deleteBook, findBookByID } from "../services/book.service.js";
import { catchAsync } from "../utils/catchAsync.js";
import { sendResponse } from "../utils/response.js";

export const getBooks = catchAsync(async (req: Request, res: Response) => {
    const books = await getAllBooks();
    
    return sendResponse(res, 200, true, "Get all data book successfully.", books);
});

export const storeBook = catchAsync(async (req: Request, res: Response) => {
    const book = await createBook(req.body);

    return sendResponse(res, 201, true, "Create book data successfully.", book);
});

export const updateBookController = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params as { id: string };

    let book = await findBookByID(id);
    if (!book) {
        return sendResponse(res, 404, false, "Book not found.");
    }

    book = await updateBook(id, req.body);
    
    return sendResponse(res, 200, true, "Book updated successfully.", book);
});

export const destroyBook = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params as { id: string };

    const book = await findBookByID(id);
    if (!book) {
        return sendResponse(res, 404, false, "Book not found.");
    }

    await deleteBook(id);
    
    return sendResponse(res, 200, true, "Book deleted successfully.");
});

export const getDetailBook = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params as { id: string };

    const book = await findBookByID(id);
    if (!book) {
        return sendResponse(res, 404, false, "Book not found.");
    }

    return sendResponse(res, 200, true, "Get detail book successfully.", book);
});