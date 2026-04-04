import { get } from "node:http";
import db from "../lib/db.js";
import type { orcamentoDBType } from "../utils/types.js";

export const OrcamentoModel = {
    async create(orcamento: orcamentoDBType) {
        try {
            const query = `INSERT INTO tabela_orcamento VALUES (?, ?, ?, ?, ?, ?)`;

            const values = [
                null,
                orcamento.total,
                orcamento.id_utilizador,
                orcamento.enabled,
                new Date(),
                new Date(),
            ];

            const rows = await db.execute(query, values);
        } catch (error) {
            console.log(error);
            return null;
        }
    },

    async getAll() {
        try {
            const query = `SELECT * FROM tabela_orcamento`;
            const rows = await db.execute(query)

            return Array.isArray(rows) && rows.length > 0 ? rows[0] : [];
        } catch (error) {
            console.log(error);
            return null
        }
    },

    async get(id: string) {
        try {
            const query = `SELECT * FROM tabela_orcamento WHERE id = ?`;

            const value = [id];

            const rows = await db.execute(query, value)
            return Array.isArray(rows) && rows.length > 0 ? rows[0] : null;
        } catch (error) {
            console.log(error);
            return null

        }
    },

    async update(id: string, updatedOrcamento: orcamentoDBType) {
        try {
            const query = `UPDATE tabela_orcamento SET total = ?, id_utilizador = ?, enabled = ?, update_at = ? WHERE id = ?`;

            const values = [
                updatedOrcamento.total,
                updatedOrcamento.id_utilizador,
                updatedOrcamento.enabled,
                new Date(),
                id
            ];
            const rows = await db.execute(query, values);
        } catch (error) {
            console.log(error);
            return null;
        }
    },



    async getTotalOrcamento(id: number){

        try {
            const query = `
                SELECT 
                ps.horas_estimadas,
                pr.taxa_urgencia,
                pr.minimo_desconto,
                pr.percentagem_desconto,
            FROM tabela_pestacao_servico ps
            JOIN tabela_prestadores pr on pr.id = ps.id_prestador
            WHERE ps.id_orcamento = ? AND ps.enabled = true 
            `
            const [rows] = await db.execute(query, id)
            
        } catch (error) {
            console.log(error);
            return null
            
        }

    },

    async delete(id: string) {
        try {
            const query = `DELETE FROM tabela_orcamento WHERE id = ?`

            const value = [id];

            const rows: any = await db.execute(query, value)
            return rows[0]?.affectedRows === 0 ? null : rows;
        } catch (error) {
            console.log(error);
            return null
        }
    }


}