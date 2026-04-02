import test from "node:test";
import assert from "node:assert/strict";
import jwt from "jsonwebtoken";
import type { NextFunction, Request } from "express";
import { AuthMiddleware } from "../security/auth.middleware.js";
import { createMockResponse } from "./helpers.js";

test("devolve 401 em token ausente", () => {
    const req = { headers: {} } as Request;
    const res = createMockResponse();
    let nextCalled = false;
    const next: NextFunction = () => {
        nextCalled = true;
    };

    AuthMiddleware(req, res, next);

    assert.equal(nextCalled, false);
    assert.equal(res.statusCode, 401);
    assert.deepEqual(res.body, {
        status: "error",
        message: "Utilizador nao autenticado",
        data: null,
    });
});

test("devolve 401 em token manipulado", () => {
    process.env.JWT_SECRET = "segredo-teste";

    const req = {
        headers: {
            authorization: "Bearer token-invalido",
        },
    } as Request;
    const res = createMockResponse();

    AuthMiddleware(req, res, () => {});

    assert.equal(res.statusCode, 401);
    assert.deepEqual(res.body, {
        status: "error",
        message: "Token invalido ou expirado",
        data: null,
    });
});

test("injeta utilizador autenticado em token valido", () => {
    process.env.JWT_SECRET = "segredo-teste";

    const token = jwt.sign(
        {
            id: "user-1",
            email: "teste@example.com",
            nome: "Teste",
        },
        process.env.JWT_SECRET,
        { expiresIn: "1h" },
    );

    const req = {
        headers: {
            authorization: `Bearer ${token}`,
        },
    } as Request;
    const res = createMockResponse();
    let nextCalled = false;

    AuthMiddleware(req, res, () => {
        nextCalled = true;
    });

    assert.equal(nextCalled, true);
    assert.deepEqual(req.user, {
        id: "user-1",
        email: "teste@example.com",
        nome: "Teste",
    });
});
