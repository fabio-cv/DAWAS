import { response, type Request, type Response } from "express";
import { PropostaModel } from "../models/proposta.model.js";
import type { PropostaDBType, ResponseType } from "../utils/types.js";

export const PropostaController = {
    async create(req: Request, res: Response) {
        const newProposta: PropostaDBType = req.body;

        if (!newProposta) {
            const response: ResponseType<null> = ({
                status: "error",
                message: "Dados de proposta invalidos",
                data: null
            })
            return res.status(400).json(response);
        }

        const createPropostaResponse: PropostaDBType | null = await PropostaModel.create(newProposta);

        if (createPropostaResponse === null) {
            const response: ResponseType<null> = ({
                status: "error",
                message: "Erro ao criar proposta",
                data: null
            })
            return res.status(400).json(response);
        }

        const response: ResponseType<PropostaDBType> = {
            status: "sucess",
            message: "Proposta criada com sucesso",
            data: createPropostaResponse
        }
        return res.status(201).json(response);
    },

    async getAll(req: Request, res: Response) {
        const getAllPropostaResponse: PropostaDBType | null = await PropostaModel.getAll();

        if (!getAllPropostaResponse) {
            const response: ResponseType<null> = {
                status: "error",
                message: "Erro ao buscar propostas",
                data: null
            }
            return res.status(500).json(response);
        }

        const response: ResponseType<PropostaDBType> = {
            status: "sucess",
            message: "Propostas buscadas com sucesso",
            data: getAllPropostaResponse
        }
        return res.status(200).json(response);
    },

    async get(req: Request, res: Response) {
        const { id } = req.params;

        if (!id) {
            const response: ResponseType<null> = {
                status: "error",
                message: "ID de proposta nao fornecido",
                data: null
            }
            return res.status(400).json(response);
        }

        const getPropostaResponse: PropostaDBType | null = await PropostaModel.get(id as string);

        if (!getPropostaResponse) {
            const response: ResponseType<null> = {
                status: "error",
                message: "Proposta nao encontrada",
                data: null
            }
            return res.status(404).json(response);
        }

        const response: ResponseType<PropostaDBType> = {
            status: "sucess",
            message: "Proposta encontrada com sucesso",
            data: getPropostaResponse
        }

        return res.status(200).json(response);
    },

    async update(req: Request, res: Response) {
        const { id } = req.params;
        const updatedProposta: PropostaDBType = req.body;

        if (!id) {
            const response: ResponseType<null> = {
                status: "error",
                message: "ID obrigatorio",
                data: null,
            }
            return res.status(400).json(response);
        }

        if (!updatedProposta) {
            const response: ResponseType<null> = {
                status: "error",
                message: "Dados de proposta invalidos",
                data: null,
            }
            return res.status(400).json(response);
        }

        const updatePropostaResponse: PropostaDBType | null = await PropostaModel.update(id as string, updatedProposta);

        if (!updatePropostaResponse) {
            const response: ResponseType<null> = {
                status: "error",
                message: "Erro ao atualizar proposta",
                data: null,
            }
            return res.status(400).json(response);
        }

        const response: ResponseType<PropostaDBType> = {
            status: "sucess",
            message: "Proposta atualizada com sucesso",
            data: updatePropostaResponse,
        }
        return res.status(200).json(response);
    },
    //Ex-3
    async aceitar(req: Request, res: Response) {
        const { id } = req.params;

        if (!id) {
            const response: ResponseType<null> = {
                status: "error",
                message: "ID de proposta nao fornecido",
                data: null,
            }
            return res.status(400).json(response);
        }

        const aceitarResponse = await PropostaModel.aceitar(id as string);

        if (!aceitarResponse) {
            const response: ResponseType<null> = {
                status: "error",
                message: "Proposta nao encontrada ou ja nao esta disponivel",
                data: null,
            }
            return res.status(404).json(response);
        }

        return res.status(200).json( {
            status: "sucess",
            message: "Proposta aceite com sucesso. Propostas concorrentes rejeitadas.",
            data: aceitarResponse,
        });
    },

    async delete(req: Request, res: Response) {
        const { id } = req.params;

        if (!id) {
            const response: ResponseType<PropostaDBType | null> = {
                status: "error",
                message: "ID obrigatorio",
                data: null,
            }
            return res.status(400).json(response);
        }

        const deletePropostaResponse = await PropostaModel.delete(id as string);

        if (!deletePropostaResponse) {
            const response: ResponseType<null> = {
                status: "error",
                message: "Erro ao apagar proposta",
                data: null,
            }
            return res.status(400).json(response);
        }
        const response: ResponseType<PropostaDBType> = {
            status: "sucess",
            message: "Proposta apagada com sucesso",
            data: deletePropostaResponse,
        }

        return res.status(200).json(response);
    }
};
