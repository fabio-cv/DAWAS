import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

declare global{
    namespace Express {
        interface Request {
            user?: {
                id: string;
                email: string;
                role: string;
            }
        }
    }
}

export function AuthMiddleware(req: Request, res: Response, next: NextFunction){
    const authHeader = req.headers.authorization

    if(!authHeader){
        return res.status(401).json({message: "Utilizador não autenticado"})
    }

    const token = authHeader.split(" ")[1]

    try {
        const decodeToken = jwt.verify(token as string, process.env.JWT_SECRET as string) as
        { id: string, email: string, role: string }

        req.user = {
            id: decodeToken.id,
            email: decodeToken.email,
            role: decodeToken.role
        }

        next()
        
    } catch (error) {
        return res.status(401).json({message: "Token inválido"})
    }
}
// RBAC - Role Based Access Control
export function authorize(roles: string[]){
    return (req: Request, res: Response, next: NextFunction)=>{
        if(!req.user){
            return res.status(401).json({message: "Utilizador não autenticado"})
        }


        if(!roles.includes(req.user.role)){
            return res.status(403).json({message: "Permissão insuficiente"})
        }

        next()
    }
}