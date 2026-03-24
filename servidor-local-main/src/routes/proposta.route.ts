import { Router } from "express";
import { propostaController } from "../controllers/proposta.controller.js";

const PropostaRouter = {
    create: "/create",
    getById: "/get-by-id/:id",
    getAll: "/",
    update: "/update/:id",
    delete: "/delete/:id",
};

const router = Router();

router.get(PropostaRouter.getAll, propostaController.getAll);
router.get(PropostaRouter.getById, propostaController.get);
router.post(PropostaRouter.create, propostaController.create);
router.put(PropostaRouter.update, propostaController.update);
router.delete(PropostaRouter.delete, propostaController.delete);

export { router };
