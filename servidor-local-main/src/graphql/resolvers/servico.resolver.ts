import { ServiceModel } from "../../models/servico.model.js"
import type { ServicoDBType } from "../../utils/types.js";

export const servicoResolver = {
    Query: {
        getAllServicos: async () => {
            return await ServiceModel.getAll();
        },
        getServicoById: async(_: any, args: { id: string }) => {
            return await ServiceModel.get(args.id)
        }
    },
    Mutation: {
        createServico: async(_:any, args: { servico: ServicoDBType }) => {
            return await ServiceModel.create(args.servico)
        },
        updateServico: async(_:any, args: { id: string,newServico: ServicoDBType}) => {
            return await ServiceModel.update(args.id, args.newServico)
        },
        deleteServico: async(_: any, args: { id: string }) => {
            return await ServiceModel.delete(args.id)
        }
    }
}