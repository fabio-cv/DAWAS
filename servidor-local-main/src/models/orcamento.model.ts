import type { ResultSetHeader, RowDataPacket } from "mysql2";
import db from "../lib/db.js";
import type { OrcamentoDBType } from "../utils/types.js";
import { quartersToYears } from "date-fns";

const now = new Date()

export const OrcamentoModel = {
    
    async create(orcamento: OrcamentoDBType): Promise<OrcamentoDBType | null> {
        try {
            const values = [
                orcamento.total,
                orcamento.id_utilizador,
                orcamento.enabled,
                now,
                now,
            ];

            const [rows] = await db.execute<ResultSetHeader>(
                `INSERT INTO tabela_orcamentos (
                    total, 
                    id_utilizador, 
                    enabled, 
                    created_at, 
                    updated_at ) VALUES (?, ?, ?, ?, ?, ?)`, 
                    values
                    ); 

            if(rows.affectedRows === 0) return null
            return {...orcamento, id: rows.insertId}

        } catch (error) {
            console.log(error);
            return null;
        }
    },

    async getAll(): Promise<OrcamentoDBType[] | null> {
        try {
            const query = `SELECT * FROM tabela_orcamentos LIMIT ? OFFSET ?`;
            const [rows] = await db.execute<OrcamentoDBType[] & RowDataPacket[]>(query)

            if(rows.length === 0) return null
            return rows as OrcamentoDBType[];
        } catch (error) {
            console.log(error);
            return null
        }
    },

    async get(id: number): Promise<OrcamentoDBType | null> {
        try {
            const query = `SELECT * FROM tabela_orcamentos WHERE id = ?`;

            const value = [id];

            const [rows] = await db.execute<OrcamentoDBType & RowDataPacket[]>(query, value)

            if(rows.length === 0) return null
            return rows[0] as OrcamentoDBType;
        } catch (error) {
            console.log(error);
            return null

        }
    },

    async update(id: number, updatedOrcamento: OrcamentoDBType): Promise<OrcamentoDBType | null> {
        try {

            const values = [
                updatedOrcamento.total,
                updatedOrcamento.id_utilizador,
                updatedOrcamento.enabled,
                now,
                id
            ];
            const [rows] = await db.execute<ResultSetHeader>(
                `UPDATE tabela_orcamentos SET total = ?, id_utilizador = ?, enabled = ?, updated_at = ? WHERE id = ?`
                , values);

            if(rows.affectedRows === 0) return null

            return { 
                id: id, 
                total: updatedOrcamento.total, 
                id_utilizador: updatedOrcamento.id_utilizador, 
                enabled: updatedOrcamento.enabled, 
                created_at: updatedOrcamento.created_at, 
                updated_at: now
            } as OrcamentoDBType

            

        } catch (error) {
            console.log(error);
            return null;
        }
    },

    //Exericio2
    async updateBudget(id: number, total: number){
        try{
            const rows: any = await db.execute(
                `UPDATE tabela_orcamentos SET total = ?, updated_at = ? WHERE id = ?`, [total, now, id]
            )
            return rows[0].affectedRows === 0 ? null : rows[0]
        }catch(err){
            console.log(err)
            return null
        }
    },

    

    async delete(id: number): Promise<OrcamentoDBType | null> {
        try {
            
            const query = `DELETE FROM tabela_orcamentos WHERE id = ?`

            const [rows] = await db.execute<ResultSetHeader>(query, [id])
            if(rows.affectedRows === 0) return null
            return 
        } catch (error) {
            console.log(error);
            return null
        }
    }


}