import type { Request, Response } from "express";
import type { ResponseType, UserDBType } from "../utils/types.js";
import { UsersModel } from "../models/user.model.js";
import { generateUUID } from "../utils/uuid.js";
import { comparePassword, hashPassword } from "../utils/password.js";
import jwt from "jsonwebtoken";


export const UserController = {
    async create(req: Request, res: Response) {
        const user: UserDBType = req.body;

        try {
            if (!user) {
                const response: ResponseType<null> = {
                    status: "error",
                    message: "Dados de utilizador invalidos",
                    data: null,
                }
                return res.status(400).json(response);
            }

            const createUserResponse: UserDBType | null = await UsersModel.create(user);

            const response: ResponseType<UserDBType> = {
                status: "success",
                message: "Utilizador criado com sucesso",
                data: createUserResponse
            }
            return res.status(201).json(response);
            
        } catch (error) {
            console.log(error);
            return null  
        }

       
    },


    async getAll(req: Request, res: Response) {
        
        try {
            const getUsersResponse = await UsersModel.getAll();
            return res.json(getUsersResponse);
            
        } catch (error) {
            console.log(error);
            return null
            
        }

        
    },

    async get(req: Request, res: Response) {
        const { id } = req.params;
        const getUserResponse: UserDBType | null = await UsersModel.get(id as string);

        if (!id) {
            const response: ResponseType<null> = {
                status: "error",
                message: "ID do utilizador é obrigatório",
                data: null
            }
            return res.status(400).json(response);

        }

        if (!getUserResponse) {
            const response: ResponseType<null> = {
                status: "error",
                message: "Utilizador não encontrado",
                data: null
            }
            return res.status(404).json(response);

        }

        const response: ResponseType<UserDBType> = {
            status: "success",
            message: "Sucesso ao buscar usuário",
            data: getUserResponse
        }
        return res.status(200).json(getUserResponse);
    },

    async update(req: Request, res: Response) {
        const { id } = req.params;
        const updatedUser: UserDBType = req.body;

        if (!id) {
            return res.status(400).json(
                {
                    status: "error",
                    message: "ID é obrigatório",
                    data: null
                }
            )
        }

        if (!updatedUser) {
            return res.status(400).json(
                {
                    status: "error",
                    message: "Dados de utilizador inválidos",
                    data: null
                }
            )
        }

        const updateUserResponse = await UsersModel.update(generateUUID(), updatedUser);

        if (!updateUserResponse) {
            return res.status(400).json(
                {
                    status: "error",
                    message: "Erro ao atualizar utilizador",
                    data: null
                }
            )
        }

        return res.status(200).json(
            {
                status: "success",
                message: "Utilizador atualizado com sucesso",
                data: updateUserResponse
            }
        )
    },

    async login(req: Request, res: Response){
        const {email, password} = req.body

        if(!email || !password){
            return res.status(404).json({
                status: "error",
                message: "Credenciais inválidos",
                data: null
            })
        }

        const userData = await UsersModel.getByEmail(email as string)

        if(!userData){
            return res.status(404).json({
                status: "error",
                message: "não existe nehum utilizador com este email",
                data: null
            })
        }

        const isPasswordValid = await comparePassword(password, userData.password)

        if(!isPasswordValid){
            return res.status(401).json({
                status: "error",
                message: "Credenciais inválidos",
                data: null
            })
        }

        const payload = {
            id: userData.id,
            email: userData.email,
            nome: userData.nome,
            
        }

        const token  = jwt.sign(payload, process.env.JWT_SECRET as string, {expiresIn: "1h"})

        return res.status(200).json({
            status: "success",
            message: "Login realizado com sucesso",
            data: {
                token,
                user: payload
            }
        })

    },
    //Ex-1
    async updatePassword(req: Request, res: Response){
        const {id} = req.params
        const {password, newPassword} = req.body
        
        if(!password || !newPassword){
            return res.status(400).json({
                status: "error",
                message: "Credencias inválidas",
                data: null
            })
        }

        const userData = await UsersModel.getById(id as string)

        if(!userData){
            return res.status(404).json({
                status: "error",
                message: "Utilizador não encontrado",
                data: null
            })
        }

        const isPwdValid = await comparePassword(password, userData!.password)

        if(!isPwdValid){
            return res.status(400).json({
                status: "error",
                message: "Credenciais inv;alidas"
            })
        }

        const updatePasswordResponse = await UsersModel.updatePassword(userData.id, await hashPassword(newPassword))

        if(!updatePasswordResponse){
            return res.status(400).json({
                status: "error",
                message: "Erro ao atualizar password",
                data: null
            })
        }

        return res.status(200).json({
            status: "sucess",
            message: "Password atualizado com sucesso",
            data: updatePasswordResponse
        })

    },


    async delete(req: Request, res: Response) {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({
                status: "error",
                message: "ID obrigatorio",
                data: null,
            });
        }

        const deleteUserResponse = await UsersModel.delete(id as string);

        if (!deleteUserResponse) {
            return res.status(400).json({
                status: "error",
                message: "Erro ao apagar servico",
                data: null,
            });
        }

        return res.status(200).json({
            status: "success",
            message: "Servico apagado com sucesso",
            data: deleteUserResponse,
        });
    }
}