import type { Request, Response } from "express";
import { OrcamentoModel } from "../models/orcamento.model.js";
import { sendError, sendSuccess } from "../utils/http.js";
import type { orcamentoDBType } from "../utils/types.js";

export const OrcamentoController = {
    async create(req: Request, res: Response) {
        const newOrcamento: orcamentoDBType = req.body;

        if (!newOrcamento || !newOrcamento.id_utilizador) {
            return sendError(res, 400, "Dados de orcamento invalidos");
        }

        const createOrcamentoResponse = await OrcamentoModel.create(newOrcamento);

        if (createOrcamentoResponse === null) {
            return sendError(res, 400, "Erro ao criar orcamento");
        }

        return sendSuccess(res, 201, "Orcamento criado com sucesso", createOrcamentoResponse);
    },

    async getAll(req: Request, res: Response) {
        const getAllOrcamentoResponse = await OrcamentoModel.getAll();

        if (!getAllOrcamentoResponse) {
            return sendError(res, 500, "Erro ao buscar orcamentos");
        }

        return sendSuccess(res, 200, "Orcamentos buscados com sucesso", getAllOrcamentoResponse);
    },

    async get(req: Request, res: Response) {
        const { id } = req.params;

        if (!id) {
            return sendError(res, 400, "ID de orcamento nao fornecido");
        }

        const getOrcamentoResponse = await OrcamentoModel.get(id);

        if (!getOrcamentoResponse) {
            return sendError(res, 404, "Orcamento nao encontrado");
        }

        return sendSuccess(res, 200, "Orcamento encontrado com sucesso", getOrcamentoResponse);
    },

    async update(req: Request, res: Response) {
        const { id } = req.params;
        const updatedOrcamento: orcamentoDBType = req.body;

        if (!id) {
            return sendError(res, 400, "ID obrigatorio");
        }

        if (!updatedOrcamento || !updatedOrcamento.id_utilizador) {
            return sendError(res, 400, "Dados de orcamento invalidos");
        }

        const updateOrcamentoResponse = await OrcamentoModel.update(id, updatedOrcamento);

        if (!updateOrcamentoResponse) {
            return sendError(res, 404, "Orcamento nao encontrado");
        }

        return sendSuccess(res, 200, "Orcamento atualizado com sucesso", updateOrcamentoResponse);
    },

    async calculate(req: Request, res: Response) {
        const { id } = req.params;

        if (!id) {
            return sendError(res, 400, "ID obrigatorio");
        }

        const calculateResponse = await OrcamentoModel.calculateTotal(id);

        if (!calculateResponse) {
            return sendError(res, 404, "Orcamento nao encontrado");
        }

        return sendSuccess(res, 200, "Total do orcamento calculado com sucesso", calculateResponse);
    },

    async delete(req: Request, res: Response) {
        const { id } = req.params;

        if (!id) {
            return sendError(res, 400, "ID obrigatorio");
        }

        const deleteOrcamentoResponse = await OrcamentoModel.delete(id);

        if (!deleteOrcamentoResponse) {
            return sendError(res, 404, "Orcamento nao encontrado");
        }

        return sendSuccess(res, 200, "Orcamento apagado com sucesso", deleteOrcamentoResponse);
    },
};
