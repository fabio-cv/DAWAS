import type {Request, Response} from "express"
import type { EmpresaDBType, ResponseType } from "../utils/types.js"
import { empresaModel } from "../models/empresa.model.js"

export const empresaController = {
    async create(req: Request, res: Response){
        try {
            const newEmpresa = req.body

            if(!newEmpresa){

                const response: ResponseType<null> = {
                    status: "error",
                    message: "Dados da empresa inválidos",
                    data: null
                }
                return res.status(400).json(response)
            }

            const createEmpresaResponse = await empresaModel.create(newEmpresa)

            const response: ResponseType<EmpresaDBType> = {
                status: "success",
                message: "Empresa criado com sucesso!",
                data: createEmpresaResponse
            }
            return res.status(201).json(response)

            
        } catch (error) {
            
        }
    }

    
}