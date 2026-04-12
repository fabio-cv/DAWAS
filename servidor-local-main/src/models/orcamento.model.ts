import type { ResultSetHeader, RowDataPacket } from "mysql2";
import db from "../lib/db.js";
import type { OrcamentoDBType } from "../utils/types.js";

export const OrcamentoModel = {
    async create(orcamento: OrcamentoDBType): Promise<OrcamentoDBType | null> {
        try {
            const query = `INSERT INTO tabela_orcamentos (id, total, id_utilizador, enabled, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?)`;

            const values = [
                null,
                orcamento.total,
                orcamento.id_utilizador,
                orcamento.enabled,
                new Date(),
                new Date(),
            ];

            const [rows] = await db.execute(query, values);
            return orcamento
        } catch (error) {
            console.log(error);
            return null;
        }
    },

    async getAll(): Promise<OrcamentoDBType[] | null> {
        try {
            const query = `SELECT * FROM tabela_orcamentos`;
            const [rows] = await db.execute<OrcamentoDBType[] & RowDataPacket[]>(query)

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
            return rows[0] as OrcamentoDBType;
        } catch (error) {
            console.log(error);
            return null

        }
    },

    async update(id: number, updatedOrcamento: OrcamentoDBType): Promise<OrcamentoDBType | null> {
        try {
            const query = `UPDATE tabela_orcamentos SET total = ?, id_utilizador = ?, enabled = ?, updated_at = ? WHERE id = ?`;

            const values = [
                updatedOrcamento.total,
                updatedOrcamento.id_utilizador,
                updatedOrcamento.enabled,
                new Date(),
                id
            ];
            const [rows] = await db.execute<ResultSetHeader>(query, values);

            return { 
                id: id, 
                total: updatedOrcamento.total, 
                id_utilizador: updatedOrcamento.id_utilizador, 
                enabled: updatedOrcamento.enabled, 
                created_at: updatedOrcamento.created_at, 
                updated_at: updatedOrcamento.updated_at 
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
                `UPDATE tabela_orcamentos SET total = ?, update_at = ? WHERE id = ?`, [total, new Date(), id]
            )
            return rows[0].affectedRows === 0 ? null : rows[0]
        }catch(err){
            console.log(err)
            return null
        }
    },

    

    async delete(id: number): Promise<OrcamentoDBType | null> {
        try {
            const querySelect = `SELECT * FROM tabela_orcamentos WHERE id = ?`
            const [result] = await db.execute<OrcamentoDBType & RowDataPacket[]>(querySelect, [id])

            const orcamento: OrcamentoDBType = result[0] as OrcamentoDBType

            const queryDelete = `DELETE FROM tabela_orcamentos WHERE id = ?`

            const rows: any = await db.execute(queryDelete, [id])
            return orcamento
        } catch (error) {
            console.log(error);
            return null
        }
    }


}