import type { PrestacaoCalculoDBType } from "../utils/types.js";

function toNumber(value: number | null | undefined) {
    return Number(value ?? 0);
}

export function calculatePrestacaoTotal(prestacao: PrestacaoCalculoDBType) {
    const horasEstimadas = toNumber(prestacao.horas_estimadas);
    const precoHora = toNumber(prestacao.preco_hora);
    const subtotalBase = horasEstimadas * precoHora;
    const subtotalAtual = toNumber(prestacao.subtotal);
    const subtotal = subtotalBase > 0 ? subtotalBase : subtotalAtual;

    let total = subtotal;
    const taxaUrgencia = toNumber(prestacao.taxa_urgencia);
    const minimoDesconto = toNumber(prestacao.minimo_desconto);
    const percentagemDesconto = toNumber(prestacao.percentagem_desconto);

    if (taxaUrgencia > 0) {
        total += subtotal * taxaUrgencia;
    }

    if (minimoDesconto > 0 && subtotal >= minimoDesconto && percentagemDesconto > 0) {
        total -= subtotal * percentagemDesconto;
    }

    return Number(total.toFixed(2));
}

export function calculateOrcamentoTotal(prestacoes: PrestacaoCalculoDBType[]) {
    return Number(
        prestacoes.reduce((acc, prestacao) => acc + calculatePrestacaoTotal(prestacao), 0).toFixed(2),
    );
}
