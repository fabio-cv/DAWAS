import type { Request, Response } from "express";
import { PrestacaoServicoModel } from "../models/prestacaoServico.model.js";
import type { PrestacaoServicoDBType, PrestacaoServicoDetalhadoType, PrestadorDBType, ResponseType } from "../utils/types.js";
import { resolve } from "node:dns";

export const PrestacaoServicoController = {
    async create(req: Request, res: Response) {
        const newPrestacaoServico: PrestacaoServicoDBType = req.body;

        if (!newPrestacaoServico) {
            const response: ResponseType<null> = {
                status: "error",
                message: "Dados de prestacao de servico invalidos",
                data: null
            }
            return res.status(400).json(response);
        }

        const createPrestacaoServicoResponse = await PrestacaoServicoModel.create(newPrestacaoServico);

        if (createPrestacaoServicoResponse === null) {
            const response: ResponseType<null>= {
                status: "error",
                message: "Erro ao criar prestacao de servico",
                data: null
            }
            return res.status(400).json(response);
        }

        const response: ResponseType<PrestacaoServicoDBType> = {
            status: "sucess",
            message: "Prestacao de servico criada com sucesso",
            data: createPrestacaoServicoResponse
        }
        return res.status(201).json(response);
    },

    async getAll(req: Request, res: Response) {
        const getAllPrestacaoServicoResponse: PrestacaoServicoDBType | null = await PrestacaoServicoModel.getAll();

        if (!getAllPrestacaoServicoResponse) {
            const response: ResponseType<null>= {
                status: "error",
                message: "Erro ao buscar prestacoes de servico",
                data: null
            }
            return res.status(500).json(response);
        }

        const response: ResponseType<PrestacaoServicoDBType> = {
            status: "sucess",
            message: "Prestacoes de servico buscadas com sucesso",
            data: getAllPrestacaoServicoResponse
        }
        return res.status(200).json(response);
    },

    async get(req: Request, res: Response) {
        const { id } = req.params;

        if (!id) {
            const response: ResponseType<null> = {
                status: "error",
                message: "ID de prestacao de servico nao fornecido",
                data: null
            }
            return res.status(400).json(response);
        }

        const getPrestacaoServicoResponse: PrestacaoServicoDBType | null = await PrestacaoServicoModel.get(id as string);

        if (!getPrestacaoServicoResponse) {
            const response: ResponseType<null> = {
                status: "error",
                message: "Prestacao de servico nao encontrada",
                data: null
            }
            return res.status(404).json(response);
        }

        const response: ResponseType<PrestacaoServicoDBType> = {
            status: "sucess",
            message: "Prestacao de servico encontrada com sucesso",
            data: getPrestacaoServicoResponse
        }
        return res.status(200).json(response);
    },

    async update(req: Request, res: Response) {
        const { id } = req.params;
        const updatedPrestacaoServico: PrestacaoServicoDBType = req.body;

        if (!id) {
            const response: ResponseType<null> = {
                status: "error",
                message: "ID obrigatorio",
                data: null,
            }
            return res.status(400).json(response);
        }

        if (!updatedPrestacaoServico) {
            const response: ResponseType<null> = {
                status: "error",
                message: "Dados de prestacao de servico invalidos",
                data: null,
            }
            return res.status(400).json(response);
        }

        const updatePrestacaoServicoResponse: PrestacaoServicoDBType | null = await PrestacaoServicoModel.update(id as string, updatedPrestacaoServico);

        if (!updatePrestacaoServicoResponse) {
            const response: ResponseType<null> = {
                status: "error",
                message: "Erro ao atualizar prestacao de servico",
                data: null,
            }
            return res.status(400).json(response);
        }

        const response: ResponseType<PrestacaoServicoDBType> = {
            status: "sucess",
            message: "Prestacao de servico atualizada com sucesso",
            data: updatePrestacaoServicoResponse,
        }
        return res.status(200).json(response);
    },

    async delete(req: Request, res: Response) {
        const { id } = req.params;

        if (!id) {
            const response: ResponseType<null> = {
                status: "error",
                message: "ID obrigatorio",
                data: null,
            }
            return res.status(400).json(response);
        }

        const deletePrestacaoServicoResponse: PrestacaoServicoDBType | null = await PrestacaoServicoModel.delete(id as string);

        if (!deletePrestacaoServicoResponse) {
            const response: ResponseType<null> = {
                status: "error",
                message: "Erro ao apagar prestacao de servico",
                data: null,
            }
            return res.status(400).json(response);
        }

        const response: ResponseType<PrestacaoServicoDBType>  = {
            status: "sucess",
            message: "Prestacao de servico apagada com sucesso",
            data: deletePrestacaoServicoResponse,
        }
        return res.status(200).json(response);
    },
    async getAllPrestacaoServicoDetalhado(req: Request, res: Response){
        const { limit, offset} = req.query as { limit: string, offset: string}  

        let LIMIT = 10
        let OFFSET = 0

        if(limit && parseInt(limit) > 10) LIMIT = parseInt(limit)
        if(offset && parseInt(offset) > 10) LIMIT = parseInt(offset)

        const getAllPrestacaoServicoResponse: PrestacaoServicoDetalhadoType | null = await PrestacaoServicoModel.getAllPrestacaoServicoDetalhada(LIMIT, OFFSET)

        if(!getAllPrestacaoServicoResponse){
            const response: ResponseType<null> = {
                status: "error",
                message: "Erro ao buscar prestações de servico",
                data: null
            }
            return res.status(500).json(response)
        }

        const response: ResponseType<PrestacaoServicoDetalhadoType> = {
            status: "sucess",
            message: "Prestação de serviço buscado com sucesso",
            data: getAllPrestacaoServicoResponse
        }
        return res.status(200).json(response)

    }
};
