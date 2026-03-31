import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export function AuthMiddleware(req: Request, res: Response, next: NextFunction){
    const authHeader = req.headers.authorization

    if(!authHeader){
        return res.status(401).json({message: "Utilizador não autenticado"})
    }

    const token = authHeader.split(" ")[1]

    try {
        const decodeToken = jwt.verify(token as string, process.env.JWT_SECRET as string)

        next()
        
    } catch (error) {
        return res.status(401).json({message: "Token inválido"})
        
        
    }
}