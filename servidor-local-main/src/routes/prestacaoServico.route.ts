import { Router } from "express";
import { PrestacaoServicoController } from "../controllers/prestacaoServico.controller.js";

const PrestacaoServicoRouter = {
    create: "/create",
    getById: "/get-by-id/:id",
    getAll: "/",
    update: "/update/:id",
    delete: "/delete/:id",
};

const router = Router();

router.get(PrestacaoServicoRouter.getAll, PrestacaoServicoController.getAll);
router.get(PrestacaoServicoRouter.getById, PrestacaoServicoController.get);
router.post(PrestacaoServicoRouter.create, PrestacaoServicoController.create);
router.put(PrestacaoServicoRouter.update, PrestacaoServicoController.update);
router.delete(PrestacaoServicoRouter.delete, PrestacaoServicoController.delete);

export { router };
