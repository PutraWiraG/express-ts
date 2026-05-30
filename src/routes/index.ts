import { Router } from "express";
import userRoutes from './user.routes.js';
import bookRoutes from './book.route.js'

const router = Router();

router.use('/users', userRoutes);
router.use('/books', bookRoutes);

export default router;