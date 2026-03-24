import { Router } from "express";
import { UserController } from "../controllers/user.controller.js";

const UsersRouter = {
    create: "/create",
    getById: "/get-by-id/:id",
    getAll: "/",
    update: "/update/:id",
    delete: "/delete/:id",
}

const router = Router()

router.get(UsersRouter.getAll, UserController.getAll)
router.get(UsersRouter.getById, UserController.get)
router.post(UsersRouter.create, UserController.create)
router.put(UsersRouter.update, UserController.update)
router.delete(UsersRouter.delete, UserController.delete) 

export { router };