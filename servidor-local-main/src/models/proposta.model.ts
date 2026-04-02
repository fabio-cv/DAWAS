import type { PoolConnection, ResultSetHeader, RowDataPacket } from "mysql2/promise";
import db from "../lib/db.js";
import type { PropostaAceitacaoResultado, propostaDBType } from "../utils/types.js";

export const PropostaModel = {
    async create(newProposta: propostaDBType) {
        try {
            const query = `
                INSERT INTO tabela_proposta (
                    id,
                    id_prestacao_servico,
                    preco_hora,
                    horas_estimadas,
                    estado,
                    enabled,
                    created_at,
                    updated_at
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
            `;

            const values = [
                null,
                newProposta.id_prestacao,
                newProposta.preco_hora,
                newProposta.horas_estimadas,
                newProposta.estado,
                newProposta.enabled,
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
                    id_prestacao_servico AS id_prestacao,
                    preco_hora,
                    horas_estimadas,
                    estado,
                    enabled,
                    created_at,
                    updated_at
                FROM tabela_proposta
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
                    id_prestacao_servico AS id_prestacao,
                    preco_hora,
                    horas_estimadas,
                    estado,
                    enabled,
                    created_at,
                    updated_at
                FROM tabela_proposta
                WHERE id = ?
            `;

            const [rows] = await db.execute<RowDataPacket[]>(query, [id]);
            return rows[0] ?? null;
        } catch (error) {
            console.log(error);
            return null;
        }
    },

    async update(id: string, updatedProposta: propostaDBType) {
        try {
            const query = `
                UPDATE tabela_proposta
                SET
                    id_prestacao_servico = ?,
                    preco_hora = ?,
                    horas_estimadas = ?,
                    estado = ?,
                    enabled = ?,
                    updated_at = ?
                WHERE id = ?
            `;

            const values = [
                updatedProposta.id_prestacao,
                updatedProposta.preco_hora,
                updatedProposta.horas_estimadas,
                updatedProposta.estado,
                updatedProposta.enabled,
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

    async acceptProposal(id: string, userId: string): Promise<PropostaAceitacaoResultado | null> {
        let connection: PoolConnection | null = null;

        try {
            connection = await db.getConnection();
            await connection.beginTransaction();

            const [proposalRows] = await connection.execute<RowDataPacket[]>(
                `
                    SELECT
                        p.id,
                        p.estado,
                        p.id_prestacao_servico,
                        ps.id_orcamento,
                        o.id_utilizadores
                    FROM tabela_proposta p
                    INNER JOIN tabela_prestacao_servico ps ON ps.id = p.id_prestacao_servico
                    INNER JOIN tabela_orcamento o ON o.id = ps.id_orcamento
                    WHERE p.id = ?
                    FOR UPDATE
                `,
                [id],
            );

            const proposal = proposalRows[0];

            if (!proposal) {
                await connection.rollback();
                return null;
            }

            if (proposal.id_utilizadores !== userId) {
                await connection.rollback();
                return {
                    propostaId: Number(id),
                    prestacaoServicoId: Number(proposal.id_prestacao_servico),
                    orcamentoId: Number(proposal.id_orcamento),
                    propostaAceite: "forbidden",
                    propostasRejeitadas: 0,
                    estadoPrestacaoServico: "forbidden",
                };
            }

            const prestacaoServicoId = Number(proposal.id_prestacao_servico);

            await connection.execute<ResultSetHeader>(
                `UPDATE tabela_proposta SET estado = 'aceito', updated_at = ? WHERE id = ?`,
                [new Date(), id],
            );

            const [propostasRejeitadasResponse] = await connection.execute<ResultSetHeader>(
                `
                    UPDATE tabela_proposta
                    SET estado = 'recusado', updated_at = ?
                    WHERE id_prestacao_servico = ?
                      AND id <> ?
                `,
                [new Date(), prestacaoServicoId, id],
            );

            await connection.execute<ResultSetHeader>(
                `
                    UPDATE tabela_prestacao_servico
                    SET estado = 'em_progresso', updated_at = ?
                    WHERE id = ?
                `,
                [new Date(), prestacaoServicoId],
            );

            await connection.commit();

            return {
                propostaId: Number(id),
                prestacaoServicoId,
                orcamentoId: Number(proposal.id_orcamento),
                propostaAceite: "aceito",
                propostasRejeitadas: propostasRejeitadasResponse.affectedRows,
                estadoPrestacaoServico: "em_progresso",
            };
        } catch (error) {
            if (connection) {
                await connection.rollback();
            }

            console.log(error);
            return null;
        } finally {
            connection?.release();
        }
    },

    async delete(id: string) {
        try {
            const query = `DELETE FROM tabela_proposta WHERE id = ?`;
            const [result] = await db.execute<ResultSetHeader>(query, [id]);
            return result.affectedRows === 0 ? null : result;
        } catch (error) {
            console.log(error);
            return null;
        }
    },
};
