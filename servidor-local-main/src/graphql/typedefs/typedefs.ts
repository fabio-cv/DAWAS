import { gql } from "graphql-tag";

export const typeDefs = gql`
    enum Role {
        CLIENTE
        ADMIN
        PRESTADOR
        EMPRESA
    }
    
    enum EstadoProposta {
        PENDENTE
        ACEITE
        CANCELADO
    }
    
    enum EstadoPrestacaoServico {
        PENDENTE
        FINALIZADO
        EM_ANDAMENTO
        CANCELADO
    }
    
    enum TipoPrestador {
        PARTICULAR
        EMPRESA
    }

    type Utilizador {
        id: ID!
        nome: String!
        numero_identificacao: String!
        data_nascimento: String!
        email: String!
        telefone: String!
        pais: String!
        localidade: String
        password: String
        role: Role
        enabled: Boolean
        created_at: String
        updated_at: String
    }
    
    type Proposta {
        id: ID!
        id_prestador: String!
        id_prestacao_servico: String!
        preco_hora: Float!
        horas_estimadas: Float!
        estado: String!
        owner: String
        enabled: Boolean
        created_at: String
        updated_at: String
    }
    
    type PrestacaoServico {
        id: ID!
        designacao: String!
        subtotal: Float!
        horas_estimadas: Float!
        id_prestador: String!
        id_servico: String!
        preco_hora: Float!
        estado: String!
        id_orcamento: String!
        id_utilizador: String!
        id_empresa: String!
        tipo_prestador: String!
        urgente: Boolean
        enabled: Boolean
        created_at: String
        updated_at: String
    }
    
    type Orcamento {
        id: ID!
        total: Float!
        id_utilizador: String!
        id_prestador: String!
        enabled: Boolean
        created_at: String
        updated_at: String
    }
    
    type Empresa {
        id: ID!
        designacao: String!
        descricao: String!
        nif: String!
        icone: String!
        id_utilizador: String!
        localidade: String!
        enabled: Boolean
        created_at: String
        updated_at: String
    }
    
    type Prestador {
        id: ID!
        nif: Int!
        profissao: String!
        taxa_urgencia: Float!
        minimo_desconto: Float!
        percentagem_desconto: Float!
        enabled: Boolean
        created_at: String
        updated_at: String
    }
    
    type Servico {
        id: ID!
        nome: String!
        descricao: String!
        categoria: String!
        enabled: Boolean
        created_at: String
        updated_at: String
    }
    
    type Categoria {
        id: ID!
        nome: String!
        descricao: String!
        enabled: Boolean
        created_at: String
        updated_at: String
    }

    input UtilizadorInput {
        id: ID
        nome: String!
        numero_identificacao: String!
        data_nascimento: String!
        email: String!
        telefone: String!
        pais: String!
        localidade: String
        password: String
        role: Role
        enabled: Boolean
    }

    input PropostaInput {
        id: ID
        id_prestador: String!
        id_prestacao_servico: String!
        preco_hora: Float!
        horas_estimadas: Float!
        estado: String!
        owner: String
        enabled: Boolean
    }

    input PrestacaoServicoInput {
        id: ID
        designacao: String!
        subtotal: Float!
        horas_estimadas: Float!
        id_prestador: String!
        id_servico: String!
        preco_hora: Float!
        estado: String!
        id_orcamento: String!
        id_utilizador: String!
        id_empresa: String!
        tipo_prestador: String!
        urgente: Boolean
        enabled: Boolean
    }

    input OrcamentoInput {
        id: ID
        total: Float!
        id_utilizador: String!
        id_prestador: String!
        enabled: Boolean
    }

    input EmpresaInput {
        id: ID
        designacao: String!
        descricao: String!
        nif: String!
        icone: String!
        id_utilizador: String!
        localidade: String!
        enabled: Boolean
    }

    input PrestadorInput {
        id: ID
        nif: Int!
        profissao: String!
        taxa_urgencia: Float!
        minimo_desconto: Float!
        percentagem_desconto: Float!
        enabled: Boolean
    }

    input ServicoInput {
        id: ID
        nome: String!
        descricao: String!
        categoria: String!
        enabled: Boolean
    }

    input CategoriaInput {
        id: ID
        nome: String!
        descricao: String!
        enabled: Boolean
    }

    type Query {
        getAllUsers: [Utilizador]
        getUsersById(id: String!): Utilizador
        getAllPropostas: [Proposta]
        getPropostaById(id: String!): Proposta
        getAllPrestacaoServicos: [PrestacaoServico]
        getPrestacaoServicoById(id: String!): PrestacaoServico
        getAllOrcamentos: [Orcamento]
        getOrcamentoById(id: String!): Orcamento
        getAllEmpresas: [Empresa]
        getEmpresaById(id: String!): Empresa
        getAllPrestadores: [Prestador]
        getPrestadorById(id: String!): Prestador
        getAllServicos: [Servico]
        getServicoById(id: String!): Servico
        getAllCategorias: [Categoria]
        getCategoriaById(id: String!): Categoria
    }

    type Mutation {
        createUser(user: UtilizadorInput!): Boolean
        updateUser(id: String!, user: UtilizadorInput!): Boolean
        deleteUser(id: String!): Boolean
        createProposta(proposta: PropostaInput!): Boolean
        updateProposta(id: String!, proposta: PropostaInput!): Boolean
        deleteProposta(id: String!): Boolean
        createPrestacaoServico(prestacaoServico: PrestacaoServicoInput!): Boolean
        updatePrestacaoServico(id: String!, prestacaoServico: PrestacaoServicoInput!): Boolean
        deletePrestacaoServico(id: String!): Boolean
        createOrcamento(orcamento: OrcamentoInput!): Boolean
        updateOrcamento(id: String!, orcamento: OrcamentoInput!): Boolean
        deleteOrcamento(id: String!): Boolean
        createEmpresa(empresa: EmpresaInput!): Boolean
        updateEmpresa(id: String!, empresa: EmpresaInput!): Boolean
        deleteEmpresa(id: String!): Boolean
        createPrestador(prestador: PrestadorInput!): Boolean
        updatePrestador(id: String!, prestador: PrestadorInput!): Boolean
        deletePrestador(id: String!): Boolean
        createServico(servico: ServicoInput!): Boolean
        updateServico(id: String!, servico: ServicoInput!): Boolean
        deleteServico(id: String!): Boolean
        createCategoria(categoria: CategoriaInput!): Boolean
        updateCategoria(id: String!, categoria: CategoriaInput!): Boolean
        deleteCategoria(id: String!): Boolean
    }
`;