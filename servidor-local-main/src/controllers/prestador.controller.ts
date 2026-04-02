import type { Request, Response } from "express";
import { PrestadorModel } from "../models/prestador.model.js";
import { sendError, sendSuccess } from "../utils/http.js";
import type { prestadorDBType } from "../utils/types.js";

export const PrestadorController = {
    async create(req: Request, res: Response) {
        const newPrestador: prestadorDBType = req.body;

        if (!newPrestador || !newPrestador.nif) {
            return sendError(res, 400, "Dados de prestador invalidos");
        }

        const createPrestadorResponse = await PrestadorModel.create(newPrestador);

        if (createPrestadorResponse === null) {
            return sendError(res, 400, "Erro ao criar prestador");
        }

        return sendSuccess(res, 201, "Prestador criado com sucesso", createPrestadorResponse);
    },

    async getAll(req: Request, res: Response) {
        const getAllPrestadorResponse = await PrestadorModel.getAll();

        if (!getAllPrestadorResponse) {
            return sendError(res, 500, "Erro ao buscar prestadores");
        }

        return sendSuccess(res, 200, "Prestadores buscados com sucesso", getAllPrestadorResponse);
    },

    async get(req: Request, res: Response) {
        const { id } = req.params;

        if (!id) {
            return sendError(res, 400, "ID de prestador nao fornecido");
        }

        const getPrestadorResponse = await PrestadorModel.get(id);

        if (!getPrestadorResponse) {
            return sendError(res, 404, "Prestador nao encontrado");
        }

        return sendSuccess(res, 200, "Prestador encontrado com sucesso", getPrestadorResponse);
    },

    async update(req: Request, res: Response) {
        const { id } = req.params;
        const updatedPrestador: prestadorDBType = req.body;

        if (!id) {
            return sendError(res, 400, "ID obrigatorio");
        }

        if (!updatedPrestador || !updatedPrestador.nif) {
            return sendError(res, 400, "Dados de prestador invalidos");
        }

        const updatePrestadorResponse = await PrestadorModel.update(id, updatedPrestador);

        if (!updatePrestadorResponse) {
            return sendError(res, 404, "Prestador nao encontrado");
        }

        return sendSuccess(res, 200, "Prestador atualizado com sucesso", updatePrestadorResponse);
    },

    async delete(req: Request, res: Response) {
        const { id } = req.params;

        if (!id) {
            return sendError(res, 400, "ID obrigatorio");
        }

        const deletePrestadorResponse = await PrestadorModel.delete(id);

        if (!deletePrestadorResponse) {
            return sendError(res, 404, "Prestador nao encontrado");
        }

        return sendSuccess(res, 200, "Prestador apagado com sucesso", deletePrestadorResponse);
    },
};
