import { Router } from "express";
import { UserController } from "../controllers/user.controller.js";
import { AuthMiddleware, authorize } from "../security/auth.middleware.js";
import { Role } from "../utils/types.js";

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

router.post(UsersRouter.login, UserController.login)
router.post(UsersRouter.create, UserController.create)

router.use(AuthMiddleware)

router.get(UsersRouter.getAll, authorize([Role.ADMIN]), UserController.getAll)
router.get(UsersRouter.getById, authorize([Role.ADMIN, Role.PRESTADOR, Role.CLIENTE, Role.EMPRESA]), UserController.get)
router.put(UsersRouter.update, authorize([Role.ADMIN, Role.PRESTADOR, Role.CLIENTE, Role.EMPRESA]), UserController.update)
router.delete(UsersRouter.delete, authorize([Role.ADMIN]), UserController.delete) 
router.put(UsersRouter.update_pwd, authorize([Role.ADMIN, Role.PRESTADOR, Role.CLIENTE, Role.EMPRESA]), UserController.updatePassword)


export { router };