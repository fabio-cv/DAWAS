import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { sendError } from "../utils/http.js";

export function AuthMiddleware(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;

    if (!authHeader?.startsWith("Bearer ")) {
        return sendError(res, 401, "Utilizador nao autenticado");
    }

    const token = authHeader.split(" ")[1];

    try {
        const decodedToken = jwt.verify(token as string, process.env.JWT_SECRET as string) as {
            id: string;
            email: string;
            nome: string;
        };

        req.user = {
            id: decodedToken.id,
            email: decodedToken.email,
            nome: decodedToken.nome,
        };

        return next();
    } catch (error) {
        return sendError(res, 401, "Token invalido ou expirado");
    }
}
