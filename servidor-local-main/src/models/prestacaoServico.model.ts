import type { ResultSetHeader, RowDataPacket } from "mysql2";
import db from "../lib/db.js";
import type { PrestacaoServicoDBType } from "../utils/types.js";

export const PrestacaoServicoModel = {
    async create(newPrestacaoServico: PrestacaoServicoDBType) {
        try {
            const query = `
                INSERT INTO tabela_prestacao_servico (
                    id,
                    designacao,
                    subtotal,
                    horas_estimadas,
                    id_prestador,
                    id_servico,
                    preco_hora,
                    estado,
                    id_orcamento,
                    enabled,
                    created_at,
                    updated_at
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            `;

            const values = [
                null,
                newPrestacaoServico.designacao,
                newPrestacaoServico.subtotal,
                newPrestacaoServico.horas_estimadas,
                newPrestacaoServico.id_prestador,
                newPrestacaoServico.id_servico,
                newPrestacaoServico.preco_hora,
                newPrestacaoServico.estado,
                newPrestacaoServico.id_orcamento,
                newPrestacaoServico.enabled,
                new Date(),
                new Date(),
            ];

            const [result] = await db.execute<ResultSetHeader>(query, values);
            return result;
        } catch (error) {
            console.log(error);
            return null;
        }
    },

    async getAll() {
        try {
            const query = `SELECT * FROM tabela_prestacao_servico`;
            const [rows] = await db.execute<RowDataPacket[]>(query);
            return rows;
        } catch (error) {
            console.log(error);
            return null;
        }
    },

    async get(id: string) {
        try {
            const query = `SELECT * FROM tabela_prestacao_servico WHERE id = ?`;
            const [rows] = await db.execute<RowDataPacket[]>(query, [id]);
            return rows[0] ?? null;
        } catch (error) {
            console.log(error);
            return null;
        }
    },

    async update(id: string, updatedPrestacaoServico: PrestacaoServicoDBType) {
        try {
            const query = `
                UPDATE tabela_prestacao_servico
                SET
                    designacao = ?,
                    subtotal = ?,
                    horas_estimadas = ?,
                    id_prestador = ?,
                    id_servico = ?,
                    preco_hora = ?,
                    estado = ?,
                    id_orcamento = ?,
                    enabled = ?,
                    updated_at = ?
                WHERE id = ?
            `;

            const values = [
                updatedPrestacaoServico.designacao,
                updatedPrestacaoServico.subtotal,
                updatedPrestacaoServico.horas_estimadas,
                updatedPrestacaoServico.id_prestador,
                updatedPrestacaoServico.id_servico,
                updatedPrestacaoServico.preco_hora,
                updatedPrestacaoServico.estado,
                updatedPrestacaoServico.id_orcamento,
                updatedPrestacaoServico.enabled,
                new Date(),
                id,
            ];

            const [result] = await db.execute<ResultSetHeader>(query, values);
            return result.affectedRows === 0 ? null : result;
        } catch (error) {
            console.log(error);
            return null;
        }
    },

    async delete(id: string) {
        try {
            const query = `DELETE FROM tabela_prestacao_servico WHERE id = ?`;
            const [result] = await db.execute<ResultSetHeader>(query, [id]);
            return result.affectedRows === 0 ? null : result;
        } catch (error) {
            console.log(error);
            return null;
        }
    },
};
