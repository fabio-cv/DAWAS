
import db from "../lib/db.js";
import type { propostaDBType } from "../utils/types.js";

export const PropostaModel = {
    async create(newProposta: propostaDBType) {
        try {
            const query = `INSERT INTO tabela_proposta VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;

            const values = [
                null,
                newProposta.id_prestacao,
                newProposta.id_prestador,
                newProposta.preco_hora,
                newProposta.horas_estimadas,
                newProposta.estado,
                newProposta.enabled,
                new Date(),
                new Date(),
            ];

            const rows = await db.execute(query, values);

            return rows;
        } catch (error) {
            console.log(error);
            return null;
        }
    },

    async getAll() {
        try {
            const query = `SELECT * FROM tabela_proposta`;

            const [rows] = await db.execute(query);

            return Array.isArray(rows) && rows.length > 0 ? rows[0] : [];
        } catch (error) {
            console.log(error);
            return null;
        }
    },

    async get(id: string) {
        try {
            const query = `SELECT * FROM tabela_proposta WHERE id = ?`;

            const value = [id];

            const rows = await db.execute(query, value);

            return Array.isArray(rows) && rows.length > 0 ? rows[0] : null;
        } catch (error) {
            console.log(error);
            return null;
        }
    },

    async update(id: string, updatedProposta: propostaDBType) {
        try {
            const query = `UPDATE tabela_proposta
                        SET
                            id_prestacao_servico=?,
                            id_prestador=?,
                            preco_hora=?,
                            horas_estimadas=?,
                            estado=?,
                            enabled=?,
                            updated_at=?
                        WHERE
                            id=?
                        ;`;

            const values = [
                updatedProposta.id_prestacao,
                updatedProposta.id_prestador,
                updatedProposta.preco_hora,
                updatedProposta.horas_estimadas,
                updatedProposta.estado,
                updatedProposta.enabled,
                new Date(),
                id,
            ];

            const rows = await db.execute(query, values);

            return rows;
        } catch (error) {
            console.log(error);
            return null;
        }
    },
    //Ex-3
    async aceitar(idProposta: string) {
        try {
            
            const queryGetProposta = `SELECT * FROM tabela_proposta WHERE id = ? AND enabled = true`;
            const [propostas]: any = await db.execute(queryGetProposta, [idProposta]);
            if (!Array.isArray(propostas) || propostas.length === 0) return null;
        
            const proposta = propostas[0];
            const idPrestacaoServico = proposta.id_prestacao_servico;

            const queryAceitarProposta = `UPDATE tabela_proposta SET estado = 'aceito', updated_at = ? WHERE id = ?`;
            await db.execute(queryAceitarProposta, [new Date(), idProposta]);

            const queryUpdatePrestacao = `UPDATE tabela_prestacao_servico SET estado = 'em_progresso', updated_at = ? WHERE id = ?`;
            await db.execute(queryUpdatePrestacao, [new Date(), idPrestacaoServico]);

            const queryRejeitarConcorrentes = `UPDATE tabela_proposta SET estado = 'recusado', updated_at = ? WHERE id_prestacao_servico = ? AND id != ? AND enabled = true`;
            await db.execute(queryRejeitarConcorrentes, [new Date(), idPrestacaoServico, idProposta]);

            return { idProposta, idPrestacaoServico, estado: "aceito" };
        } catch (error) {
            console.log(error);
            return null;
        }
    },

    async delete(id: string) {
        try {
            const query = `DELETE FROM tabela_proposta WHERE id = ?`;

            const value = [id];

            const rows: any = await db.execute(query, value);

            return rows[0]?.affectedRows === 0 ? null : rows;
        } catch (error) {
            console.log(error);
            return null;
        }
    }
};
