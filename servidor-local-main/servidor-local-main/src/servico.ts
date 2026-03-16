
import db from "./lib/db.js";
import { type ResponseType, type ServicoType } from "./utils/types.js"

export let catalogoServicos: ServicoType[] = [
    {
        nome: "servicoTeste1",
        precoHora: 12.0,
        categoria: "categoriaTeste1",
        minimoDescontado: 4.0,
        percentagemDesconto: 5.3
    },
    {
        nome: "servicoTeste2",
        precoHora: 8.0,
        categoria: "categoriaTeste2",
        minimoDescontado: 12.0,
        percentagemDesconto: 8.0
    },
    {
        nome: "servicoTeste3",
        precoHora: 18.0,
        categoria: "categoriaTeste3",
        minimoDescontado: 2.0,
        percentagemDesconto: 3.3

    }
]

// adicionar um serviço novo
export async function adicionarServico(novoServico: ServicoType) {

    try {
        if (!novoServico.nome) {
            return ({
                status: false,
                message: "Erro: Nome obrigatório e preço deve ser maior que zero.",
                data: null,
            });
        }

        const [rows] = await db.execute(
            `INSERT INTO tabela_servicos VALUES(?, ?, ?, ?, ?, ?, ?)`, [null, novoServico.nome, novoServico.desconto, novoServico.categoria, novoServico.enabled, new Date, new Date]
        )
        console.log({ rows });

        return {
            status: true,
            message: `Sucesso ao adicionar serviço`, 
            data: rows
        }

    } catch (error) {
        console.log(error);
        return null
        
    }

}

// listar todos os serviços
export function listarServicos(): ServicoType[] {
    // TODO: implementar fetch de servicos

    return catalogoServicos
}

// apagar um servico 
export function apagarServico(nome: string): boolean {
    // TODO: implementar delete de servico

    const novoCatalogoTemp: ServicoType[] = []

    for (let i = 0; i < catalogoServicos.length; i++) {
        if (catalogoServicos[i]?.nome !== undefined && catalogoServicos[i]?.nome !== nome) {
            novoCatalogoTemp.push(catalogoServicos[i]!)
        }
    } // devolve um novo catalogo sem o servico que foi apagado

    catalogoServicos = novoCatalogoTemp

    return true
}

// obter um servico pelo nome
export function obterServico(nome: string): ServicoType | null {
    for (let i = 0; i < catalogoServicos.length; i++) {
        if (catalogoServicos[i]?.nome === nome) {
            return catalogoServicos[i]!
        }
    }
    return null
}

