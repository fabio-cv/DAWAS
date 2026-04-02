export interface PedidoServicoType {
    cliente: string;
    descricao: string;
    horasEstimadas: number;
    urgente: boolean;
}

export interface ResponseType {
    status: boolean;
    message: string;
    data: ServicoType | null;
}

export interface ServicoType {
    nome: string;
    precoHora: number;
    categoria: string;
    minimoDescontado: number;
    percentagemDesconto?: number;
}

export interface PrestadorType {
    nome: string;
    precoHora: number;
    profissao: string;
    minimoParaDesconto: number;
    percentagemDesconto: number;
    taxaUrgencia: number;
}

export interface UserDBType {
    id: string;
    nome: string;
    numero_identificacao: string;
    data_nascimento: string;
    email: string;
    telefone: string;
    pais: string;
    localidade: string;
    password: string;
    enabled: boolean;
    created_at: string;
    updated_at: string;
}

export interface ServicoDBType {
    id: number;
    nome: string;
    descricao: string;
    categoria: string;
    enabled: boolean;
    created_at: string;
    updated_at: string;
}

export interface orcamentoDBType {
    id: number;
    total: number;
    id_utilizador: string;
    enabled: boolean;
    created_at: string;
    updated_at: string;
}

export interface propostaDBType {
    id: number;
    id_prestacao: number;
    preco_hora: number;
    horas_estimadas: number;
    estado: string;
    enabled: boolean;
    created_at: string;
    updated_at: string;
}

export interface prestadorDBType {
    id: string;
    nif: string;
    profissao: string;
    taxa_urgencia: number;
    minimo_desconto: number;
    percentagem_desconto: number;
    disponivel: boolean;
    enabled: boolean;
    created_at: string;
    updated_at: string;
}

export interface PrestacaoServicoDBType {
    id: number;
    designacao: string;
    subtotal: number;
    horas_estimadas: number;
    id_orcamento: number;
    id_servico: number;
    preco_hora: number;
    estado: string;
    id_prestador: string;
    enabled: boolean;
    created_at: string;
    updated_at: string;
}

export interface PrestacaoCalculoDBType {
    id: number;
    subtotal: number;
    horas_estimadas: number | null;
    preco_hora: number | null;
    id_prestador: string;
    taxa_urgencia: number | null;
    minimo_desconto: number | null;
    percentagem_desconto: number | null;
}

export interface PropostaAceitacaoResultado {
    propostaId: number;
    prestacaoServicoId: number;
    orcamentoId: number;
    propostaAceite: string;
    propostasRejeitadas: number;
    estadoPrestacaoServico: string;
}
