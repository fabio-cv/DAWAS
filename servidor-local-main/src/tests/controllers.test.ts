import test from "node:test";
import assert from "node:assert/strict";
import type { Request } from "express";
import { OrcamentoController } from "../controllers/orcamento.controller.js";
import { PropostaController } from "../controllers/proposta.controller.js";
import { OrcamentoModel } from "../models/orcamento.model.js";
import { PropostaModel } from "../models/proposta.model.js";
import { createMockResponse } from "./helpers.js";

test("orcamento calcular responde 404 para ID inexistente", async () => {
    const originalMethod = OrcamentoModel.calculateTotal;
    OrcamentoModel.calculateTotal = async () => null;

    const req = { params: { id: "999" } } as Request;
    const res = createMockResponse();

    await OrcamentoController.calculate(req, res);

    assert.equal(res.statusCode, 404);
    assert.deepEqual(res.body, {
        status: "error",
        message: "Orcamento nao encontrado",
        data: null,
    });

    OrcamentoModel.calculateTotal = originalMethod;
});

test("proposta aceitar rejeita utilizador sem permissao", async () => {
    const originalMethod = PropostaModel.acceptProposal;
    PropostaModel.acceptProposal = async () => ({
        propostaId: 10,
        prestacaoServicoId: 7,
        orcamentoId: 3,
        propostaAceite: "forbidden",
        propostasRejeitadas: 0,
        estadoPrestacaoServico: "forbidden",
    });

    const req = {
        params: { id: "10" },
        user: { id: "outro-user", email: "outro@example.com", nome: "Outro" },
    } as Request;
    const res = createMockResponse();

    await PropostaController.accept(req, res);

    assert.equal(res.statusCode, 403);
    assert.deepEqual(res.body, {
        status: "error",
        message: "Apenas o dono do orcamento pode aceitar a proposta",
        data: null,
    });

    PropostaModel.acceptProposal = originalMethod;
});

test("proposta aceitar responde 401 sem user autenticado", async () => {
    const req = { params: { id: "10" } } as Request;
    const res = createMockResponse();

    await PropostaController.accept(req, res);

    assert.equal(res.statusCode, 401);
    assert.deepEqual(res.body, {
        status: "error",
        message: "Utilizador nao autenticado",
        data: null,
    });
});

test("proposta aceitar devolve sucesso com cascata", async () => {
    const originalMethod = PropostaModel.acceptProposal;
    PropostaModel.acceptProposal = async () => ({
        propostaId: 10,
        prestacaoServicoId: 7,
        orcamentoId: 3,
        propostaAceite: "aceito",
        propostasRejeitadas: 2,
        estadoPrestacaoServico: "em_progresso",
    });

    const req = {
        params: { id: "10" },
        user: { id: "owner-1", email: "owner@example.com", nome: "Owner" },
    } as Request;
    const res = createMockResponse();

    await PropostaController.accept(req, res);

    assert.equal(res.statusCode, 200);
    assert.deepEqual(res.body, {
        status: "success",
        message: "Proposta aceite com sucesso",
        data: {
            propostaId: 10,
            prestacaoServicoId: 7,
            orcamentoId: 3,
            propostaAceite: "aceito",
            propostasRejeitadas: 2,
            estadoPrestacaoServico: "em_progresso",
        },
    });

    PropostaModel.acceptProposal = originalMethod;
});
