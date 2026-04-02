import { Router } from "express";
import { UserController } from "../controllers/user.controller.js";
import { AuthMiddleware } from "../security/auth.middleware.js";

const UsersRouter = {
    create: "/create",
    getById: "/get-by-id/:id",
    getAll: "/",
    update: "/update/:id",
    delete: "/delete/:id",
    login: "/login",
    update_pwd: "/update-pwd/:id"

}

const router = Router()

router.get(UsersRouter.getAll, UserController.getAll)
router.get(UsersRouter.getById, UserController.get)
router.post(UsersRouter.create, UserController.create)
router.put(UsersRouter.update, UserController.update)
router.delete(UsersRouter.delete, UserController.delete) 
router.post(UsersRouter.login, UserController.login)
router.put(UsersRouter.update_pwd, UserController.updatePassword)


export { router };