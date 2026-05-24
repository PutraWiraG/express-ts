import { Router } from "express";
import { getUsers, storeUser, updateUserController, deleteUserController, getDetailUser } from "../controllers/user.controller.js";
import { baseUserSchema } from "../validations/use.validation.js";
import { validate } from "../middlewares/validate.js";

const router = Router();

router.get('/', getUsers);
router.post('/', validate(baseUserSchema), storeUser);
router.put('/:id', validate(baseUserSchema), updateUserController);
router.delete('/:id', deleteUserController);
router.get('/:id', getDetailUser);

export default router;