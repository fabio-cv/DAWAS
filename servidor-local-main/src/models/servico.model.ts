import type { ResultSetHeader, RowDataPacket } from "mysql2";
import db from "../lib/db.js";
import type { ServicoDBType } from "../utils/types.js";

export const ServicoModel = {
    async create(newServico: ServicoDBType) {
        try {
            const query = `
                INSERT INTO tabela_servicos (
                    id,
                    nome,
                    descricao,
                    categoria,
                    enabled,
                    created_at,
                    updated_at
                ) VALUES (?, ?, ?, ?, ?, ?, ?)
            `;

            const values = [
                null,
                newServico.nome,
                newServico.descricao,
                newServico.categoria,
                newServico.enabled,
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
            const [rows] = await db.execute<RowDataPacket[]>(`SELECT * FROM tabela_servicos`);
            return rows;
        } catch (error) {
            console.log(error);
            return null;
        }
    },

    async get(id: string) {
        try {
            const [rows] = await db.execute<RowDataPacket[]>(
                `SELECT * FROM tabela_servicos WHERE id = ?`,
                [id],
            );

            return rows[0] ?? null;
        } catch (error) {
            console.log(error);
            return null;
        }
    },

    async update(id: string, updatedServico: ServicoDBType) {
        try {
            const query = `
                UPDATE tabela_servicos
                SET
                    nome = ?,
                    descricao = ?,
                    categoria = ?,
                    enabled = ?,
                    updated_at = ?
                WHERE id = ?
            `;

            const values = [
                updatedServico.nome,
                updatedServico.descricao,
                updatedServico.categoria,
                updatedServico.enabled,
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
            const [result] = await db.execute<ResultSetHeader>(
                `DELETE FROM tabela_servicos WHERE id = ?`,
                [id],
            );

            return result.affectedRows === 0 ? null : result;
        } catch (error) {
            console.log(error);
            return null;
        }
    },
};
