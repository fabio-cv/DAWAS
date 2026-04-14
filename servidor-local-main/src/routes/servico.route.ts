import { Router } from "express";
import { ServicoController } from "../controllers/servico.controller.js";
import { authorize } from "../security/auth.middleware.js";
import { Role } from "../utils/types.js";

const ServicoRoute = {
    create: "/create",
    getById: "/get-by-id/:id",
    getAll: "/",
    update: "/update/:id",
    delete: "/delete/:id",
    getAllDetailed: "/all-detailed",
}

const router = Router()

router.get(ServicoRoute.getAll, authorize([Role.ADMIN, Role.PRESTADOR, Role.CLIENTE, Role.EMPRESA]), ServicoController.getAll)
router.get(ServicoRoute.getById, authorize([Role.ADMIN, Role.PRESTADOR, Role.CLIENTE, Role.EMPRESA]), ServicoController.get)
router.post(ServicoRoute.create, authorize([Role.ADMIN]), ServicoController.createServico)
router.put(ServicoRoute.update, authorize([Role.ADMIN]), ServicoController.update)
router.delete(ServicoRoute.delete, authorize([Role.ADMIN]), ServicoController.delete)
router.get(ServicoRoute.getAllDetailed, authorize([Role.ADMIN, Role.PRESTADOR, Role.CLIENTE, Role.EMPRESA]), ServicoController.getAllServicoDetalhado)


export { router };

