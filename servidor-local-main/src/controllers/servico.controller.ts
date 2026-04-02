import type { Request, Response } from "express";
import { ServicoModel } from "../models/servico.model.js";
import { sendError, sendSuccess } from "../utils/http.js";
import type { ServicoDBType } from "../utils/types.js";

export const ServicoController = {
    async CreateServico(req: Request, res: Response) {
        const newServico: ServicoDBType = req.body;

        if (!newServico || !newServico.nome) {
            return sendError(res, 400, "Dados de servico invalidos");
        }

        const createServicoResponse = await ServicoModel.create(newServico);

        if (createServicoResponse === null) {
            return sendError(res, 400, "Erro ao criar servico");
        }

        return sendSuccess(res, 201, "Servico criado com sucesso", createServicoResponse);
    },

    async getAll(req: Request, res: Response) {
        const getAllServicoResponse = await ServicoModel.getAll();

        if (!getAllServicoResponse) {
            return sendError(res, 500, "Erro ao buscar servicos");
        }

        return sendSuccess(res, 200, "Servicos buscados com sucesso", getAllServicoResponse);
    },

    async get(req: Request, res: Response) {
        const { id } = req.params;

        if (!id) {
            return sendError(res, 400, "ID de servico nao fornecido");
        }

        const getServicoResponse = await ServicoModel.get(id);

        if (!getServicoResponse) {
            return sendError(res, 404, "Servico nao encontrado");
        }

        return sendSuccess(res, 200, "Servico encontrado com sucesso", getServicoResponse);
    },

    async update(req: Request, res: Response) {
        const { id } = req.params;
        const updatedServico: ServicoDBType = req.body;

        if (!id) {
            return sendError(res, 400, "ID obrigatorio");
        }

        if (!updatedServico || !updatedServico.nome) {
            return sendError(res, 400, "Dados de servico invalidos");
        }

        const updateServicoResponse = await ServicoModel.update(id, updatedServico);

        if (!updateServicoResponse) {
            return sendError(res, 404, "Servico nao encontrado");
        }

        return sendSuccess(res, 200, "Servico atualizado com sucesso", updateServicoResponse);
    },

    async delete(req: Request, res: Response) {
        const { id } = req.params;

        if (!id) {
            return sendError(res, 400, "ID obrigatorio");
        }

        const deleteServicoResponse = await ServicoModel.delete(id);

        if (!deleteServicoResponse) {
            return sendError(res, 404, "Servico nao encontrado");
        }

        return sendSuccess(res, 200, "Servico apagado com sucesso", deleteServicoResponse);
    },
};
