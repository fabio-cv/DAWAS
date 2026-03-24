import { Router } from "express";
import { ServicoController } from "../controllers/servico.controller.js";

const ServicoRoute = {
    create: "/create",
    getById: "/get-by-id/:id",
    getAll: "/",
    update: "/update/:id",
    delete: "/delete/:id",
}

const router = Router()

router.get(ServicoRoute.getAll, ServicoController.getAll)
router.get(ServicoRoute.getById, ServicoController.get)
router.post(ServicoRoute.create, ServicoController.CreateServico)
router.put(ServicoRoute.update, ServicoController.update)
router.delete(ServicoRoute.delete, ServicoController.delete)


export { router };