import type { Request, Response } from "express";
import { OrcamentoModel } from "../models/orcamento.model.js";
import { EstadoProposta, type OrcamentoDBType, type PropostaDBType, type ResponseType } from "../utils/types.js";

import { PrestacaoServicoModel } from "../models/prestacaoServico.model.js";
import { PropostaModel } from "../models/proposta.model.js";
import { PrestadorModel } from "../models/prestador.model.js";


export const OrcamentoController = {
    async create(req: Request, res: Response) {
        const newOrcamento: OrcamentoDBType = req.body;

        if (!newOrcamento) {
            const response: ResponseType<null> = {
                status: "error",
                message: "Dados de orcamento invalidos",
                data: null
            }
            return res.status(400).json(response);
        }

        const createOrcamentoResponse: OrcamentoDBType | null = await OrcamentoModel.create(newOrcamento);

        if (createOrcamentoResponse === null) {

            const response: ResponseType<null> = {
                status: "error",
                message: "Erro ao criar orcamento",
                data: null
            }
            return res.status(400).json(response);
        }

        const response: ResponseType<OrcamentoDBType> = {
            status: "sucess",
            message: "Orcamento criado com sucesso",
            data: createOrcamentoResponse
        }

        return res.status(201).json(response);
    },

    async getAll(req: Request, res: Response) {
        const getAllOrcamentoResponse: OrcamentoDBType | null= await OrcamentoModel.getAll();

        if (!getAllOrcamentoResponse) {
            const response: ResponseType<null> = {
                status: "error",
                message: "Erro ao buscar orcamentos",
                data: null
            }
            return res.status(500).json(response);
        }

        const response: ResponseType<OrcamentoDBType> = {
            status: "sucess",
            message: "Orcamentos buscados com sucesso",
            data: getAllOrcamentoResponse
        }
        return res.status(200).json(response);
    },

    async get(req: Request, res: Response) {
        const { id } = req.params;

        if (!id) {
            const response: ResponseType<null> = {
                status: "error",
                message: "ID de orcamento nao fornecido",
                data: null
            }
            return res.status(400).json(response);
        }

        const getOrcamentoResponse: OrcamentoDBType | null = await OrcamentoModel.get(id as string);

        if (!getOrcamentoResponse) {
            const response: ResponseType<null> = {
                status: "error",
                message: "Orcamento nao encontrado",
                data: null
            }
            return res.status(404).json(response);
        }

        const response: ResponseType<OrcamentoDBType> = {
            status: "sucess",
            message: "Orcamento encontrado com sucesso",
            data: getOrcamentoResponse
        }
        return res.status(200).json(response);
    },

    async update(req: Request, res: Response) {
        const { id } = req.params;
        const updatedOrcamento: OrcamentoDBType = req.body;

        if (!id) {
            const response: ResponseType<null> = {
                status: "error",
                message: "ID obrigatorio",
                data: null,
            }
            return res.status(400).json(response);
        }

        if (!updatedOrcamento) {
            const response: ResponseType<null> = {
                status: "error",
                message: "Dados de orcamento invalidos",
                data: null,
            }
            return res.status(400).json(response);
        }

        const updateOrcamentoResponse: OrcamentoDBType | null = await OrcamentoModel.update(id as string, updatedOrcamento);

        if (!updateOrcamentoResponse) {
            const response: ResponseType<null> = {
                status: "error",
                message: "Erro ao atualizar orcamento",
                data: null,
            }
            return res.status(400).json(response);
        }

        const response: ResponseType<OrcamentoDBType> = {
            status: "sucess",
            message: "Orcamento atualizado com sucesso",
            data: updateOrcamentoResponse,
        }
        return res.status(200).json(response);
    },
    //Ex-2
    //calcular budget
    async calcularBudget(req: Request, res: Response) {
        const { id } = req.params;

        if (!id) {
            const response: ResponseType<null> = {
                status: "error",
                message: "ID obrigatorio",
                data: null
            }
            return res.status(400).json(response);
        }
    

    const prestacaoServico = await PrestacaoServicoModel.getByIdOrcamento( id as string)

    if (!prestacaoServico) {

        const response: ResponseType<null> = {
            status: "error",
            message: "Prestacao de servico nao encontrada",
            data: null
        }
        return res.status(404).json(response);
    }

    // FETCH ALL PROPOSTAL
    const proposals = await PropostaModel.getByPrestacaoServico(String(prestacaoServico.id))

    

    if(!proposals){
        const response: ResponseType<null> = {
            status: "error",
            message: "Proposta não encontrada",
            data: null
        }

        return res.status(404).json(response)
    }

    const acceptedProposal: PropostaDBType | undefined = proposals.find((proposal)=>proposal.estado === EstadoProposta.ACEITE)

    if(!acceptedProposal){

        const response: ResponseType<null> = {
            status: "error",
            message: "Ainda nenhuma proposta aceite",
            data: null
        }

        return res.status(404).json(response)
    }

    const precoHora = acceptedProposal.preco_hora
    const horaEstimada = acceptedProposal.horas_estimadas

    const prestador =  await PrestadorModel.get(acceptedProposal.id_prestador)

    if(!prestador){

        const response: ResponseType<null> = {
            status: "error",
            message: "Prestador não encontrado",
            data: null
        }

        return res.status(404).json(response)
    }

    const urgencyTax = prestador.taxa_urgencia
    const minimumDiscount = prestador.minimo_desconto
    const discountPercentage = prestador.percentagem_desconto

    let subtotal = precoHora * horaEstimada

    if(subtotal > minimumDiscount){
        subtotal = subtotal * (1 - discountPercentage)
    }

    if(prestacaoServico.urgente){
        subtotal = subtotal * (1 + urgencyTax)
    }

    const updatedOrcamentoResponse = await OrcamentoModel.updateBudget(id as string, subtotal)

    if(!updatedOrcamentoResponse){
        const response: ResponseType<null> = {
            status:"error",
            message: "Erro ao calcular orcamento",
            data: null
        }
        return res.status(400).json(response)
    }

    const response: ResponseType<OrcamentoDBType> = {
        status: "sucess",
        message: "Orcamento calculado e atualizado com sucesso",
        data: updatedOrcamentoResponse
    }

    return res.status(200).json(response)

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

        const deleteOrcamentoResponse = await OrcamentoModel.delete(id as string);

        if (!deleteOrcamentoResponse) {
            const response: ResponseType<null> = {
                status: "error",
                message: "Erro ao apagar orcamento",
                data: null,
            }
            return res.status(400).json(response);
        }

        const response: ResponseType<OrcamentoDBType> = {
            status: "sucess",
            message: "Orcamento apagado com sucesso",
            data: deleteOrcamentoResponse,
        }

        return res.status(200).json(response);
    }
};
