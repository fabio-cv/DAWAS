import { ServiceModel } from "../../models/servico.model.js";
    import type { ServicoDBType } from "../../utils/types.js";

    export const servicoResolver = {
        Query: {
            getAllServicos: async () => {
                return await ServiceModel.getAll();
            },
            getServicoById: async (_: any, args: { id: string }) => {
                return await ServiceModel.get(args.id);
            }
        },
        Mutation: {
            createServico: async (_: any, args: { nome:string, descricao?:string, categoria?:string, enabled?:boolean }) => {
                const servico: ServicoDBType = {
            id:"",
            nome: args.nome,
            descricao: args.descricao || "",
            categoria: args.categoria || "",
            enabled: args.enabled ?? true,
            created_at: "",
            updated_at:""
            }

                return await ServiceModel.create(servico);
            },
            updateServico: async (_: any, args: { id: string, servico: ServicoDBType }) => {
                return await ServiceModel.update(args.id, args.servico);
            },
            deleteServico: async (_: any, args: { id: string }) => {
                return await ServiceModel.delete(args.id);
            }
        }
    }