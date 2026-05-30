import { Router } from "express";
import { getBooks, storeBook, updateBookController, destroyBook, getDetailBook } from "../controllers/book.controller.js";
import { baseBookSchema } from "../validations/book.validation.js";
import { validate } from "../middlewares/validate.js";

const router = Router();

router.get('/', getBooks);
router.post('/', validate(baseBookSchema), storeBook);
router.put('/:id', validate(baseBookSchema), updateBookController);
router.delete('/:id', destroyBook);
router.get('/:id', getDetailBook);

export default router;