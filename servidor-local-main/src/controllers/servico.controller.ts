import { ServicoModel } from "../models/servico.model.js";
import type { ServicoDBType } from "../utils/types.js";
import type { Request, Response } from "express";

export const ServicoController = {
    async CreateServico(req: Request, res: Response) {
        const newServico: ServicoDBType = req.body;

        if (!newServico) {
            return res.status(400).json({
                status: "error",
                message: "Dados de servico invalidos",
                data: null,
            });
        }

        const createServicoResponse = await ServicoModel.create(newServico);

        if (createServicoResponse === null) {
            return res.status(400).json({
                status: "error",
                message: "Erro ao criar servico",
                data: null,
            });
        }

        return res.status(201).json({
            status: "success",
            message: "Servico criado com sucesso",
            data: createServicoResponse,
        });
    },

    async getAll(req: Request, res: Response) {
        const getAllServicoResponse = await ServicoModel.getAll();

        if (!getAllServicoResponse) {
            return res.status(500).json({
                status: "error",
                message: "Erro ao buscar servicos",
                data: null,
            });
        }

        return res.status(200).json({
            status: "success",
            message: "Servicos buscados com sucesso",
            data: getAllServicoResponse,
        });
    },

    async get(req: Request, res: Response) {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({
                status: "error",
                message: "ID de servico nao fornecido",
                data: null,
            });
        }

        const getServicoResponse = await ServicoModel.get(id as string);

        if (!getServicoResponse) {
            return res.status(404).json({
                status: "error",
                message: "Servico nao encontrado",
                data: null,
            });
        }

        return res.status(200).json({
            status: "success",
            message: "Servico encontrado com sucesso",
            data: getServicoResponse,
        });
    },

    async update(req: Request, res: Response) {
        const { id } = req.params;

        const updatedServico: ServicoDBType = req.body;

        if (!id) {
            return res.status(400).json({
                status: "error",
                message: "ID obrigatorio",
                data: null,
            });
        }

        if (!updatedServico) {
            return res.status(400).json({
                status: "error",
                message: "Dados de servico invalidos",
                data: null,
            });
        }

        const updateServicoResponse = await ServicoModel.update(
            id as string,
            updatedServico,
        );

        if (!updateServicoResponse) {
            return res.status(400).json({
                status: "error",
                message: "Erro ao atualizar servico",
                data: null,
            });
        }

        return res.status(200).json({
            status: "success",
            message: "Servico atualizado com sucesso",
            data: updateServicoResponse,
        });
    },

    async delete(req: Request, res: Response) {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({
                status: "error",
                message: "ID obrigatorio",
                data: null,
            });
        }

        const deleteServicoResponse = await ServicoModel.delete(id as string);

        if (!deleteServicoResponse) {
            return res.status(400).json({
                status: "error",
                message: "Erro ao apagar servico",
                data: null,
            });
        }

        return res.status(200).json({
            status: "success",
            message: "Servico apagado com sucesso",
            data: deleteServicoResponse,
        });
    },
};
