import type { Request, Response } from "express";
import { PrestacaoServicoModel } from "../models/prestacaoServico.model.js";
import { sendError, sendSuccess } from "../utils/http.js";
import type { PrestacaoServicoDBType } from "../utils/types.js";

export const PrestacaoServicoController = {
    async create(req: Request, res: Response) {
        const newPrestacaoServico: PrestacaoServicoDBType = req.body;

        if (!newPrestacaoServico || !newPrestacaoServico.designacao) {
            return sendError(res, 400, "Dados de prestacao de servico invalidos");
        }

        const createPrestacaoServicoResponse = await PrestacaoServicoModel.create(newPrestacaoServico);

        if (createPrestacaoServicoResponse === null) {
            return sendError(res, 400, "Erro ao criar prestacao de servico");
        }

        return sendSuccess(
            res,
            201,
            "Prestacao de servico criada com sucesso",
            createPrestacaoServicoResponse,
        );
    },

    async getAll(req: Request, res: Response) {
        const getAllPrestacaoServicoResponse = await PrestacaoServicoModel.getAll();

        if (!getAllPrestacaoServicoResponse) {
            return sendError(res, 500, "Erro ao buscar prestacoes de servico");
        }

        return sendSuccess(
            res,
            200,
            "Prestacoes de servico buscadas com sucesso",
            getAllPrestacaoServicoResponse,
        );
    },

    async get(req: Request, res: Response) {
        const { id } = req.params;

        if (!id) {
            return sendError(res, 400, "ID de prestacao de servico nao fornecido");
        }

        const getPrestacaoServicoResponse = await PrestacaoServicoModel.get(id);

        if (!getPrestacaoServicoResponse) {
            return sendError(res, 404, "Prestacao de servico nao encontrada");
        }

        return sendSuccess(
            res,
            200,
            "Prestacao de servico encontrada com sucesso",
            getPrestacaoServicoResponse,
        );
    },

    async update(req: Request, res: Response) {
        const { id } = req.params;
        const updatedPrestacaoServico: PrestacaoServicoDBType = req.body;

        if (!id) {
            return sendError(res, 400, "ID obrigatorio");
        }

        if (!updatedPrestacaoServico || !updatedPrestacaoServico.designacao) {
            return sendError(res, 400, "Dados de prestacao de servico invalidos");
        }

        const updatePrestacaoServicoResponse = await PrestacaoServicoModel.update(id, updatedPrestacaoServico);

        if (!updatePrestacaoServicoResponse) {
            return sendError(res, 404, "Prestacao de servico nao encontrada");
        }

        return sendSuccess(
            res,
            200,
            "Prestacao de servico atualizada com sucesso",
            updatePrestacaoServicoResponse,
        );
    },

    async delete(req: Request, res: Response) {
        const { id } = req.params;

        if (!id) {
            return sendError(res, 400, "ID obrigatorio");
        }

        const deletePrestacaoServicoResponse = await PrestacaoServicoModel.delete(id);

        if (!deletePrestacaoServicoResponse) {
            return sendError(res, 404, "Prestacao de servico nao encontrada");
        }

        return sendSuccess(
            res,
            200,
            "Prestacao de servico apagada com sucesso",
            deletePrestacaoServicoResponse,
        );
    },
};
