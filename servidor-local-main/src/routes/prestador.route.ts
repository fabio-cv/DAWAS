import { Router } from "express";
import { PrestadorController } from "../controllers/prestador.controller.js";

const PrestadorRouter = {
    create: "/create",
    getById: "/get-by-id/:id",
    getAll: "/",
    update: "/update/:id",
    delete: "/delete/:id",
};

const router = Router();

router.get(PrestadorRouter.getAll, PrestadorController.getAll);
router.get(PrestadorRouter.getById, PrestadorController.get);
router.post(PrestadorRouter.create, PrestadorController.create);
router.put(PrestadorRouter.update, PrestadorController.update);
router.delete(PrestadorRouter.delete, PrestadorController.delete);

export { router };
