import type { Request, Response } from "express";
import { OrcamentoModel } from "../models/orcamento.model.js";
import { EstadoProposta, type orcamentoDBType, type prestadorDBType, type propostaDBType } from "../utils/types.js";
import { PrestacaoServicoModel } from "../models/prestacaoServico.model.js";
import { PropostaModel } from "../models/proposta.model.js";
import { PrestadorModel } from "../models/prestador.model.js";
import { sub } from "date-fns/fp";

export const OrcamentoController = {
    async create(req: Request, res: Response) {
        const newOrcamento: orcamentoDBType = req.body;

        if (!newOrcamento) {
            return res.status(400).json({
                status: "error",
                message: "Dados de orcamento invalidos",
                data: null
            });
        }

        const createOrcamentoResponse = await OrcamentoModel.create(newOrcamento);

        if (createOrcamentoResponse === null) {
            return res.status(400).json({
                status: "error",
                message: "Erro ao criar orcamento",
                data: null
            });
        }

        return res.status(201).json({
            status: "success",
            message: "Orcamento criado com sucesso",
            data: createOrcamentoResponse
        });
    },

    async getAll(req: Request, res: Response) {
        const getAllOrcamentoResponse = await OrcamentoModel.getAll();

        if (!getAllOrcamentoResponse) {
            return res.status(500).json({
                status: "error",
                message: "Erro ao buscar orcamentos",
                data: null
            });
        }

        return res.status(200).json({
            status: "success",
            message: "Orcamentos buscados com sucesso",
            data: getAllOrcamentoResponse
        });
    },

    async get(req: Request, res: Response) {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({
                status: "error",
                message: "ID de orcamento nao fornecido",
                data: null
            });
        }

        const getOrcamentoResponse = await OrcamentoModel.get(id as string);

        if (!getOrcamentoResponse) {
            return res.status(404).json({
                status: "error",
                message: "Orcamento nao encontrado",
                data: null
            });
        }

        return res.status(200).json({
            status: "success",
            message: "Orcamento encontrado com sucesso",
            data: getOrcamentoResponse
        });
    },

    async update(req: Request, res: Response) {
        const { id } = req.params;
        const updatedOrcamento: orcamentoDBType = req.body;

        if (!id) {
            return res.status(400).json({
                status: "error",
                message: "ID obrigatorio",
                data: null,
            });
        }

        if (!updatedOrcamento) {
            return res.status(400).json({
                status: "error",
                message: "Dados de orcamento invalidos",
                data: null,
            });
        }

        const updateOrcamentoResponse = await OrcamentoModel.update(id as string, updatedOrcamento);

        if (!updateOrcamentoResponse) {
            return res.status(400).json({
                status: "error",
                message: "Erro ao atualizar orcamento",
                data: null,
            });
        }

        return res.status(200).json({
            status: "success",
            message: "Orcamento atualizado com sucesso",
            data: updateOrcamentoResponse,
        });
    },
    //Ex-2
    async calcularTotal(req: Request, res: Response) {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({
                status: "error",
                message: "ID obrigatório",
                data: null,
            });
        }

        const total = await OrcamentoModel.calcularTotal(id as string);

        if (total === null) {
            return res.status(404).json({
                status: "error",
                message: "Orcamento nao encontrado ou sem prestacoes de servico com proposta aceite",
                data: null,
            });
        }

        return res.status(200).json({
            status: "success",
            message: "Total do orcamento calculado com sucesso",
            data: { total },
        });
    },

    //calcular budget
    async calcularBudget(req: Request, res: Response) {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({
                status: "error",
                message: "ID obrigatorio",
                data: null
            });
        }
    

    const prestacaoServico = await PrestacaoServicoModel.getByIdOrcamento( id as string)

    if (!prestacaoServico) {
        return res.status(404).json({
            status: "error",
            message: "Prestacao de servico nao encontrada",
            data: null
        });
    }

    // FETCH ALL PROPOSTAL
    const proposals = await PropostaModel.getByPrestacaoServico(String(prestacaoServico.id))

    

    if(!proposals){
        return res.status(404).json({
            status: "error",
            message: "Proposta não encontrada",
            data: null
        })
    }

    const acceptedProposal: propostaDBType | undefined = proposals.find((proposal)=>proposal.estado === EstadoProposta.ACEITE)

    if(!acceptedProposal){
        return res.status(404).json({
            status: "error",
            message: "Ainda nenhuma proposta aceite",
            data: null
        })
    }

    const precoHora = acceptedProposal.preco_hora
    const horaEstimada = acceptedProposal.horas_estimadas

    const prestador =  await PrestadorModel.get(acceptedProposal.id_prestador)

    if(!prestador){
        return res.status(404).json({
            status: "error",
            message: "Prestador não encontrado",
            data: null
        })
    }

    const urgencyTax = prestador.taxaUrgencia
    const minimumDiscount = prestador.minimoDesconto
    const discountPercentage = prestador.percentagemDesconto

    let subtotal = precoHora * horaEstimada

    if(subtotal > minimumDiscount){
        subtotal = subtotal * (1 - discountPercentage)
    }

    if(prestacaoServico.urgente){
        subtotal = subtotal * (1 + urgencyTax)
    }

    const updatedOrcamentoResponse = await OrcamentoModel.updateBudget(id as string, subtotal)

    if(!updatedOrcamentoResponse){
        return res.status(400).json({
            status:"error",
            message: "Erro ao calcular orcamento",
            data: null
        })
    }

    return res.status(200).json({
        status: "sucess",
        message: "Orcamento calculado e atualizado com sucesso",
        data: updatedOrcamentoResponse
    })
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

        const deleteOrcamentoResponse = await OrcamentoModel.delete(id as string);

        if (!deleteOrcamentoResponse) {
            return res.status(400).json({
                status: "error",
                message: "Erro ao apagar orcamento",
                data: null,
            });
        }

        return res.status(200).json({
            status: "success",
            message: "Orcamento apagado com sucesso",
            data: deleteOrcamentoResponse,
        });
    }
};
