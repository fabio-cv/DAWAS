import type { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { UsersModel } from "../models/user.model.js";
import { comparePassword } from "../utils/password.js";
import { sendError, sendSuccess } from "../utils/http.js";
import type { UserDBType } from "../utils/types.js";

export const UserController = {
    async create(req: Request, res: Response) {
        const user: UserDBType = req.body;

        if (!user || !user.email || !user.password) {
            return sendError(res, 400, "Dados de utilizador invalidos");
        }

        const createUserResponse = await UsersModel.create(user);

        if (!createUserResponse) {
            return sendError(res, 400, "Erro ao criar utilizador");
        }

        return sendSuccess(res, 201, "Utilizador criado com sucesso", createUserResponse);
    },

    async getAll(req: Request, res: Response) {
        const getUsersResponse = await UsersModel.getAll();

        if (!getUsersResponse) {
            return sendError(res, 500, "Erro ao buscar utilizadores");
        }

        return sendSuccess(res, 200, "Utilizadores buscados com sucesso", getUsersResponse);
    },

    async get(req: Request, res: Response) {
        const { id } = req.params;

        if (!id) {
            return sendError(res, 400, "ID do utilizador e obrigatorio");
        }

        const getUserResponse = await UsersModel.get(id);

        if (!getUserResponse) {
            return sendError(res, 404, "Utilizador nao encontrado");
        }

        return sendSuccess(res, 200, "Utilizador encontrado com sucesso", getUserResponse);
    },

    async update(req: Request, res: Response) {
        const { id } = req.params;
        const updatedUser: UserDBType = req.body;

        if (!id) {
            return sendError(res, 400, "ID e obrigatorio");
        }

        if (!updatedUser || !updatedUser.email) {
            return sendError(res, 400, "Dados de utilizador invalidos");
        }

        const updateUserResponse = await UsersModel.update(id, updatedUser);

        if (!updateUserResponse) {
            return sendError(res, 404, "Utilizador nao encontrado");
        }

        return sendSuccess(res, 200, "Utilizador atualizado com sucesso", updateUserResponse);
    },

    async login(req: Request, res: Response) {
        const { email, password } = req.body;

        if (!email || !password) {
            return sendError(res, 400, "Credenciais invalidas");
        }

        const userData = await UsersModel.getByEmail(email as string);

        if (!userData) {
            return sendError(res, 404, "Nao existe nenhum utilizador com este email");
        }

        const isPasswordValid = await comparePassword(password, userData.password);

        if (!isPasswordValid) {
            return sendError(res, 401, "Credenciais invalidas");
        }

        const payload = {
            id: userData.id,
            email: userData.email,
            nome: userData.nome,
        };

        const token = jwt.sign(payload, process.env.JWT_SECRET as string, { expiresIn: "1h" });

        return sendSuccess(res, 200, "Login realizado com sucesso", {
            token,
            user: payload,
        });
    },

    async delete(req: Request, res: Response) {
        const { id } = req.params;

        if (!id) {
            return sendError(res, 400, "ID obrigatorio");
        }

        const deleteUserResponse = await UsersModel.delete(id);

        if (!deleteUserResponse) {
            return sendError(res, 404, "Utilizador nao encontrado");
        }

        return sendSuccess(res, 200, "Utilizador apagado com sucesso", deleteUserResponse);
    },
};
