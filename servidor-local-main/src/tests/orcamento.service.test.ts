import test from "node:test";
import assert from "node:assert/strict";
import { calculateOrcamentoTotal, calculatePrestacaoTotal } from "../services/orcamento.service.js";

test("calcula subtotal com taxa de urgencia", () => {
    const total = calculatePrestacaoTotal({
        id: 1,
        subtotal: 0,
        horas_estimadas: 5,
        preco_hora: 20,
        id_prestador: "prest-1",
        taxa_urgencia: 0.2,
        minimo_desconto: 0,
        percentagem_desconto: 0,
    });

    assert.equal(total, 120);
});

test("aplica desconto quando atinge minimo do prestador", () => {
    const total = calculatePrestacaoTotal({
        id: 2,
        subtotal: 0,
        horas_estimadas: 10,
        preco_hora: 20,
        id_prestador: "prest-2",
        taxa_urgencia: 0,
        minimo_desconto: 100,
        percentagem_desconto: 0.1,
    });

    assert.equal(total, 180);
});

test("soma varias prestacoes no total do orcamento", () => {
    const total = calculateOrcamentoTotal([
        {
            id: 1,
            subtotal: 0,
            horas_estimadas: 2,
            preco_hora: 30,
            id_prestador: "prest-1",
            taxa_urgencia: 0,
            minimo_desconto: 0,
            percentagem_desconto: 0,
        },
        {
            id: 2,
            subtotal: 0,
            horas_estimadas: 4,
            preco_hora: 25,
            id_prestador: "prest-2",
            taxa_urgencia: 0.1,
            minimo_desconto: 200,
            percentagem_desconto: 0.15,
        },
    ]);

    assert.equal(total, 170);
});
