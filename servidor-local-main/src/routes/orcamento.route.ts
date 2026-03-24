import { Router } from "express";
import { orcamentoController } from "../controllers/orcamento.controller.js";

const OrcamentoRouter = {
    create: "/create",
    getById: "/get-by-id/:id",
    getAll: "/",
    update: "/update/:id",
    delete: "/delete/:id",
};

const router = Router();

router.get(OrcamentoRouter.getAll, orcamentoController.getAll);
router.get(OrcamentoRouter.getById, orcamentoController.get);
router.post(OrcamentoRouter.create, orcamentoController.create);
router.put(OrcamentoRouter.update, orcamentoController.update);
router.delete(OrcamentoRouter.delete, orcamentoController.delete);

export { router };
