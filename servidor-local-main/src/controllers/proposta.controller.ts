import type { Request, Response } from "express";
import { PropostaModel } from "../models/proposta.model.js";
import { sendError, sendSuccess } from "../utils/http.js";
import type { propostaDBType } from "../utils/types.js";

export const PropostaController = {
    async create(req: Request, res: Response) {
        const newProposta: propostaDBType = req.body;

        if (!newProposta || !newProposta.id_prestacao) {
            return sendError(res, 400, "Dados de proposta invalidos");
        }

        const createPropostaResponse = await PropostaModel.create(newProposta);

        if (createPropostaResponse === null) {
            return sendError(res, 400, "Erro ao criar proposta");
        }

        return sendSuccess(res, 201, "Proposta criada com sucesso", createPropostaResponse);
    },

    async getAll(req: Request, res: Response) {
        const getAllPropostaResponse = await PropostaModel.getAll();

        if (!getAllPropostaResponse) {
            return sendError(res, 500, "Erro ao buscar propostas");
        }

        return sendSuccess(res, 200, "Propostas buscadas com sucesso", getAllPropostaResponse);
    },

    async get(req: Request, res: Response) {
        const { id } = req.params;

        if (!id) {
            return sendError(res, 400, "ID de proposta nao fornecido");
        }

        const getPropostaResponse = await PropostaModel.get(id as string);

        if (!getPropostaResponse) {
            return sendError(res, 404, "Proposta nao encontrada");
        }

        return sendSuccess(res, 200, "Proposta encontrada com sucesso", getPropostaResponse);
    },

    async update(req: Request, res: Response) {
        const { id } = req.params;
        const updatedProposta: propostaDBType = req.body;

        if (!id) {
            return sendError(res, 400, "ID obrigatorio");
        }

        if (!updatedProposta || !updatedProposta.id_prestacao) {
            return sendError(res, 400, "Dados de proposta invalidos");
        }

        const updatePropostaResponse = await PropostaModel.update(id as string, updatedProposta);

        if (!updatePropostaResponse) {
            return sendError(res, 404, "Proposta nao encontrada");
        }

        return sendSuccess(res, 200, "Proposta atualizada com sucesso", updatePropostaResponse);
    },

    async accept(req: Request, res: Response) {
        const { id } = req.params;
        const userId = req.user?.id;

        if (!id) {
            return sendError(res, 400, "ID obrigatorio");
        }

        if (!userId) {
            return sendError(res, 401, "Utilizador nao autenticado");
        }

        const acceptResponse = await PropostaModel.acceptProposal(id as string, userId);

        if (!acceptResponse) {
            return sendError(res, 404, "Proposta nao encontrada");
        }

        if (acceptResponse.propostaAceite === "forbidden") {
            return sendError(res, 403, "Apenas o dono do orcamento pode aceitar a proposta");
        }

        return sendSuccess(res, 200, "Proposta aceite com sucesso", acceptResponse);
    },

    async delete(req: Request, res: Response) {
        const { id } = req.params;

        if (!id) {
            return sendError(res, 400, "ID obrigatorio");
        }

        const deletePropostaResponse = await PropostaModel.delete(id as string);

        if (!deletePropostaResponse) {
            return sendError(res, 404, "Proposta nao encontrada");
        }

        return sendSuccess(res, 200, "Proposta apagada com sucesso", deletePropostaResponse);
    },
};
