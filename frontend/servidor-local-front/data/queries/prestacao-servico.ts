"use client"
import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";

interface PrestacaoServicoDBType {
    id: string;
    preco_hora: number;
    designacao: string;
    servico: {
        id: string;
        categoria: {
            id: string;
            nome: string;
            icone: string;
        };
    };
}

export const GET_ALL_PRESTACOES_SERVICOS = gql`
    query GetAllPrestacoesServicos {
        getAllPrestacoesServicos {
            id
            preco_hora
            designacao
            servico {
                id
                categoria {
                    id
                    icone
                }
            }
        }
    }
`

export function getAllPrestacoesServicos() {
    const { loading, error, data } = useQuery<PrestacaoServicoDBType[]>(GET_ALL_PRESTACOES_SERVICOS);
    return { loading, error, data };
}
