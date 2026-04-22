import { gql } from "graphql-tag";
    enum Role {
        CLIENTE,
        ADMIN,
        PRESTADOR,
        EMPRESA
    }
    enum EstadoProposta {
        PENDENTE,
        ACEITE,
        CANCELADO
    }
    enum EstadoPrestacaoServico {
        PENDENTE,
        FINALIZADO,
        EM_ANDAMENTO,
        CANCELADO
    }
    enum TipoPrestador {
        PARTICULAR,
        EMPRESA
    }

export const typeDefs = gql`
    type Utilizador {
        id: ID!,
        nome: String!,
        numero_identificacao: String!,
        data_nascimento: String!,
        email: String!,
        telefone: String!,
        pais: String!,
        localidade: String,
        password: String,
        role: Role,
        enabled: boolean,
        created_at: String,
        updated_at: String
    };
    type Proposta {
        id: ID!,
        id_prestador: Prestador,
        id_prestacao_servico: PrestacaoServico,
        preco_hora: Float,
        horas_estimadas: Float,
        estado: String,
        owner: String,
        enabled: boolean,
        created_at: String,
        updated_at: String
    };
    type PrestacaoServico {
        id: ID!,
        designacao: String,
        subtotal: Float,
        horas_estimadas: Int,
        id_prestador: Prestador,
        id_servico: Servico,
        preco_hora: Float,
        estado: String,
        id_orcamento: Orcamento,
        id_utilizador: Utilizador,
        id_empresa: Empresa,
        tipo_prestador: TipoPrestador,
        urgente: boolean,
        enabled: boolean,
        created_at: String,
        updated_at: String
    };
    type Orcamento {
        id: ID!,
        total: Float,
        id_utilizador: Utilizador,
        id_prestador: Prestador,
        enabled: boolean,
        created_at: String,
        updated_at: String
    };
    type Empresa {
        id: ID!,
        designacao: String,
        descricao: String,
        nif: String,
        icone: String,
        id_utilizador: Utilizador,
        localidade: String,
        enabled: boolean,
        created_at: String,
        updated_at: String
    };
    type Prestador {
        id: ID!,
        nif: Int,
        profissao: String,
        taxa_urgencia: Float,
        minimo_desconto: Float,
        percentagem_desconto: Float,
        enabled: boolean,
        created_at: String,
        updated_at: String
    };
    type Servico {
        id: ID!,
        nome: String,
        descricao: String,
        categoria: Categoria,
        enabled: boolean,
        created_at: String,
        updated_at: String
    };
    type Categoria {
        id: ID!,
        nome: String,
        descricao: String,
        enabled: boolean,
        created_at: String,
        updated_at: String
    }`; 