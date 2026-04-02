import type { ResultSetHeader, RowDataPacket } from "mysql2";
import db from "../lib/db.js";
import { calculateOrcamentoTotal } from "../services/orcamento.service.js";
import type { PrestacaoCalculoDBType, orcamentoDBType } from "../utils/types.js";

export const OrcamentoModel = {
    async create(orcamento: orcamentoDBType) {
        try {
            const query = `
                INSERT INTO tabela_orcamento (
                    id,
                    total,
                    id_utilizadores,
                    enabled,
                    created_at,
                    updated_at
                ) VALUES (?, ?, ?, ?, ?, ?)
            `;

            const values = [
                null,
                orcamento.total,
                orcamento.id_utilizador,
                orcamento.enabled,
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
            const query = `
                SELECT
                    id,
                    total,
                    id_utilizadores AS id_utilizador,
                    enabled,
                    created_at,
                    updated_at
                FROM tabela_orcamento
            `;
            const [rows] = await db.execute<RowDataPacket[]>(query);
            return rows;
        } catch (error) {
            console.log(error);
            return null;
        }
    },

    async get(id: string) {
        try {
            const query = `
                SELECT
                    id,
                    total,
                    id_utilizadores AS id_utilizador,
                    enabled,
                    created_at,
                    updated_at
                FROM tabela_orcamento
                WHERE id = ?
            `;

            const [rows] = await db.execute<RowDataPacket[]>(query, [id]);
            return rows[0] ?? null;
        } catch (error) {
            console.log(error);
            return null;
        }
    },

    async update(id: string, updatedOrcamento: orcamentoDBType) {
        try {
            const query = `
                UPDATE tabela_orcamento
                SET
                    total = ?,
                    id_utilizadores = ?,
                    enabled = ?,
                    updated_at = ?
                WHERE id = ?
            `;

            const values = [
                updatedOrcamento.total,
                updatedOrcamento.id_utilizador,
                updatedOrcamento.enabled,
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

    async calculateTotal(id: string) {
        try {
            const [orcamentos] = await db.execute<RowDataPacket[]>(
                `SELECT id FROM tabela_orcamento WHERE id = ?`,
                [id],
            );

            if (orcamentos.length === 0) {
                return null;
            }

            const [prestacoes] = await db.execute<(PrestacaoCalculoDBType & RowDataPacket)[]>(
                `
                    SELECT
                        ps.id,
                        ps.subtotal,
                        ps.horas_estimadas,
                        ps.preco_hora,
                        ps.id_prestador,
                        p.taxa_urgencia,
                        p.minimo_desconto,
                        p.percentagem_desconto
                    FROM tabela_prestacao_servico ps
                    INNER JOIN tabela_prestadores p ON p.id = ps.id_prestador
                    WHERE ps.id_orcamento = ?
                      AND ps.enabled = true
                `,
                [id],
            );

            const total = calculateOrcamentoTotal(prestacoes);

            const [updateResult] = await db.execute<ResultSetHeader>(
                `UPDATE tabela_orcamento SET total = ?, updated_at = ? WHERE id = ?`,
                [total, new Date(), id],
            );

            if (updateResult.affectedRows === 0) {
                return null;
            }

            return {
                id: Number(id),
                total,
                prestacoes_processadas: prestacoes.length,
            };
        } catch (error) {
            console.log(error);
            return null;
        }
    },

    async delete(id: string) {
        try {
            const query = `DELETE FROM tabela_orcamento WHERE id = ?`;
            const [result] = await db.execute<ResultSetHeader>(query, [id]);
            return result.affectedRows === 0 ? null : result;
        } catch (error) {
            console.log(error);
            return null;
        }
    },
};
