import { ServicoModel } from "../models/servico.model.js";
import type { ResponseType, ServicoDBType } from "../utils/types.js";
import type { Request, Response } from "express";

export const ServicoController = {
    async CreateServico(req: Request, res: Response) {
        const newServico: ServicoDBType = req.body;

        if (!newServico) {
            const response: ResponseType<null>= {
                status: "error",
                message: "Dados de servico invalidos",
                data: null,
            }
            return res.status(400).json(response);
        }

        const createServicoResponse: ServicoDBType | null = await ServicoModel.create(newServico);

        if (createServicoResponse === null) {
            const response: ResponseType<null> = {
                status: "error",
                message: "Erro ao criar servico",
                data: null,
            }
            return res.status(400).json(response);
        }
        const response: ResponseType<ServicoDBType> = {
            status: "sucess",
            message: "Servico criado com sucesso",
            data: createServicoResponse,
        }

        return res.status(201).json(response);
    },

    async getAll(req: Request, res: Response) {
        const getAllServicoResponse: ServicoDBType | null = await ServicoModel.getAll();

        if (!getAllServicoResponse) {
            const response: ResponseType<null> = {
                status: "error",
                message: "Erro ao buscar servicos",
                data: null,
            }
            return res.status(500).json(response);
        }

        const response: ResponseType<ServicoDBType> = {
            status: "sucess",
            message: "Servicos buscados com sucesso",
            data: getAllServicoResponse,
        }
        return res.status(200).json(response);
    },

    async get(req: Request, res: Response) {
        const { id } = req.params;

        if (!id) {
            const response: ResponseType<null> = {
                status: "error",
                message: "ID de servico nao fornecido",
                data: null,
            }
            return res.status(400).json(response);
        }

        const getServicoResponse: ServicoDBType | null = await ServicoModel.get(id as string);

        if (!getServicoResponse) {
            const response: ResponseType<null> = {
                status: "error",
                message: "Servico nao encontrado",
                data: null,
            }
            return res.status(404).json(response);
        }

        const response: ResponseType<ServicoDBType> = {
            status: "sucess",
            message: "Servico encontrado com sucesso",
            data: getServicoResponse,
        }
        return res.status(200).json(response);
    },

    async update(req: Request, res: Response) {
        const { id } = req.params;

        const updatedServico: ServicoDBType = req.body;

        if (!id) {
            const response: ResponseType<null> = {
                status: "error",
                message: "ID obrigatorio",
                data: null,
            }
            return res.status(400).json(response);
        }

        if (!updatedServico) {
            const response: ResponseType<null> = {
                status: "error",
                message: "Dados de servico invalidos",
                data: null,
            }
            return res.status(400).json(response);
        }

        const updateServicoResponse: ServicoDBType | null = await ServicoModel.update(id as string, updatedServico);

        if (!updateServicoResponse) {
            const response: ResponseType<null> = {
                status: "error",
                message: "Erro ao atualizar servico",
                data: null,
            }
            return res.status(400).json(response);
        }

        const response: ResponseType<ServicoDBType> = {
            status: "sucess",
            message: "Servico atualizado com sucesso",
            data: updateServicoResponse,
        }
        return res.status(200).json(response);
    },

    async delete(req: Request, res: Response) {
        const { id } = req.params;

        if (!id) {
            const response: ResponseType<null>= {
                status: "error",
                message: "ID obrigatorio",
                data: null,
            }
            return res.status(400).json(response);
        }

        const deleteServicoResponse = await ServicoModel.delete(id as string);

        if (!deleteServicoResponse) {
            const response: ResponseType<null> = {
                status: "error",
                message: "Erro ao apagar servico",
                data: null,
            }
            return res.status(400).json(response);
        }

        const response: ResponseType<ServicoDBType> = {
            status: "sucess",
            message: "Servico apagado com sucesso",
            data: deleteServicoResponse,
        }
        return res.status(200).json(response);
    },
};
