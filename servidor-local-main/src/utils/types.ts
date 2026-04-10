export interface UserDBType {
    id: string,
    nome: string,
    numero_identificacao: string,
    data_nascimento: string,
    email: string,
    telefone: string,
    pais: string,
    localidade: string,
    password: string,
    enabled: boolean,
    created_at: string,
    updated_at: string
}

export interface ServicoDBType {
    id: number,
    nome: string,
    desconto: string,
    categoria: string,
    enabled: boolean,
    created_at: string,
    update_at: string
}


export interface OrcamentoDBType {
    id: string,
    total: number,
    id_utilizador: string,
    enabled: boolean,
    created_at: string,
    update_at: string
}

export interface PropostaDBType{
    id: string,
    id_prestacao: number,
    id_prestador: string,
    preco_hora: number,
    horas_estimadas: number,
    estado: string,
    enabled: boolean,
    created_at: string,
    update_at: string
}

export interface PrestadorDBType {
    id: string,
    nif: string,
    profissao: string,
    taxa_urgencia: number,
    minimo_desconto: number,
    percentagem_desconto: number,
    enabled: boolean,
    created_at: string,
    update_at: string

}


export interface PrestacaoServicoDBType{
    id: number,
    designacao: string,
    subtotal: number,
    horas_estimadas: number,
    id_orcamento: number,
    id_utilizador: string,
    id_servico: number,
    preco_hora: number,
    estado: string,
    urgente: boolean,
    finalizado: string,
    id_prestador: string,
    enabled: boolean,
    created_at: string,
    update_at: string

} 

export enum EstadoProposta{
    PENDENTE =  "pendente",
    ACEITE = "aceite",
    CANCELADO = "cancelado"
}

export enum EstadoPrestacaoServico{
    PENDENTE = "pendente",
    FINALIZADO = "finalizado",
    EM_PROGRESSO = "em_progresso",
    CANCELADO = "cancelado"
}

export interface PrestacaoServicoDetalhadoType {
    id: string, 
    nome_utilizador: string,
    email_utilizador: string,
    nome_servico: string,
    descricao: string,
    data_pedido: string,
    urgente: boolean
}
export interface ResponseType<T>{
    status: "sucess" | "error",
    message: string,
    data: T | null
}
