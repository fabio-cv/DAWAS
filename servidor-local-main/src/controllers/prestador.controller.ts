import type { Request, Response } from "express";
import { PrestadorModel } from "../models/prestador.model.js";
import type { prestadorDBType } from "../utils/types.js";

export const PrestadorController = {
    async create(req: Request, res: Response) {
        const newPrestador: prestadorDBType = req.body;

        if (!newPrestador) {
            return res.status(400).json({
                status: "error",
                message: "Dados de prestador invalidos",
                data: null
            });
        }

        const createPrestadorResponse = await PrestadorModel.create(newPrestador);

        if (createPrestadorResponse === null) {
            return res.status(400).json({
                status: "error",
                message: "Erro ao criar prestador",
                data: null
            });
        }

        return res.status(201).json({
            status: "success",
            message: "Prestador criado com sucesso",
            data: createPrestadorResponse
        });
    },

    async getAll(req: Request, res: Response) {
        const getAllPrestadorResponse = await PrestadorModel.getAll();

        if (!getAllPrestadorResponse) {
            return res.status(500).json({
                status: "error",
                message: "Erro ao buscar prestadores",
                data: null
            });
        }

        return res.status(200).json({
            status: "success",
            message: "Prestadores buscados com sucesso",
            data: getAllPrestadorResponse
        });
    },

    async get(req: Request, res: Response) {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({
                status: "error",
                message: "ID de prestador nao fornecido",
                data: null
            });
        }

        const getPrestadorResponse = await PrestadorModel.get(id as string);

        if (!getPrestadorResponse) {
            return res.status(404).json({
                status: "error",
                message: "Prestador nao encontrado",
                data: null
            });
        }

        return res.status(200).json({
            status: "success",
            message: "Prestador encontrado com sucesso",
            data: getPrestadorResponse
        });
    },

    async update(req: Request, res: Response) {
        const { id } = req.params;
        const updatedPrestador: prestadorDBType = req.body;

        if (!id) {
            return res.status(400).json({
                status: "error",
                message: "ID obrigatorio",
                data: null,
            });
        }

        if (!updatedPrestador) {
            return res.status(400).json({
                status: "error",
                message: "Dados de prestador invalidos",
                data: null,
            });
        }

        const updatePrestadorResponse = await PrestadorModel.update(id as string, updatedPrestador);

        if (!updatePrestadorResponse) {
            return res.status(400).json({
                status: "error",
                message: "Erro ao atualizar prestador",
                data: null,
            });
        }

        return res.status(200).json({
            status: "success",
            message: "Prestador atualizado com sucesso",
            data: updatePrestadorResponse,
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

        const deletePrestadorResponse = await PrestadorModel.delete(id as string);

        if (!deletePrestadorResponse) {
            return res.status(400).json({
                status: "error",
                message: "Erro ao apagar prestador",
                data: null,
            });
        }

        return res.status(200).json({
            status: "success",
            message: "Prestador apagado com sucesso",
            data: deletePrestadorResponse,
        });
    }
};
