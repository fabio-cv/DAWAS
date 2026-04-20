import db from "../lib/db.js"
import type { EmpresaDBType } from "../utils/types.js"
import type { RowDataPacket } from "mysql2"


export const empresaModel = {

    async create(newEmpresa: EmpresaDBType): Promise<EmpresaDBType | null>{
        try {

            const dateNow = new Date()

            const query = `
                INSERT INTO (
                    designacao, 
                    descricao, 
                    nif, 
                    icone, 
                    id_utilizador,
                    localizacao,
                    enabled,
                    created_at,
                    updated_at
                    ) tabela_empresa VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)    
            `

            const values = [
                newEmpresa.designacao,
                newEmpresa.descricao,
                newEmpresa.nif,
                newEmpresa.icone,
                newEmpresa.id_utilizador,
                newEmpresa.localizacao,
                newEmpresa.enabled,
                dateNow,
                dateNow
            ]
            const [rows] = await db.execute<EmpresaDBType & RowDataPacket[]>(query, values)
            return rows as EmpresaDBType
            
        } catch (error) {
            console.log(error);
            return null
            
            
        }

    }

}