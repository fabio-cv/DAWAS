import { Router } from "express"
import { EmpresaController } from "../controllers/empresa.controller.js"
import AuthMiddleware, { authorize } from "../security/auth.middleware.js"
import { Role } from "../utils/types.js"


const EmpresaRoute = {
    create: "/create",
    getById: "/get-by-id/:id",
    getAll: "/",
    update: "/update/:id",
    delete: "/delete/:id",
}
const router = Router()

router.post(EmpresaRoute.create, authorize([Role.ADMIN, Role.PRESTADOR, Role.EMPRESA]), EmpresaController.create)

router.use(AuthMiddleware)

router.get(EmpresaRoute.getAll, authorize([Role.ADMIN]), EmpresaController.getAll)
router.get(EmpresaRoute.getById, authorize([Role.ADMIN,]), EmpresaController.get)
router.put(EmpresaRoute.update, authorize([Role.ADMIN, Role.CLIENTE]), EmpresaController.update)
router.delete(EmpresaRoute.delete, authorize([Role.ADMIN]), EmpresaController.delete)


export default EmpresaRoute;