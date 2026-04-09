
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
            return rows
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


    //Exericio2
    async calcularTotal(idOrcamento: string) {
        try {
          
            const queryPrestacoes = `SELECT * FROM tabela_prestacao_servico WHERE id_orcamento = ? AND enabled = true`;
            const [prestacoes]: any = await db.execute(queryPrestacoes, [idOrcamento]);

            if (!Array.isArray(prestacoes) || prestacoes.length === 0) return null;

            let totalGeral = 0;

            for (const prestacao of prestacoes) {
                const idPrestacaoServico = prestacao.id;
                const queryPropostas = `SELECT * FROM tabela_proposta WHERE id_prestacao_servico = ? AND enabled = true`;
                const [propostas]: any = await db.execute(queryPropostas, [idPrestacaoServico]);

                if (!Array.isArray(propostas) || propostas.length === 0) {
                    continue;
                }
                const propostaAceite = propostas.find((p: any) => p.estado === 'aceito');

                if (!propostaAceite) {
                    continue;
                }
                const { preco_hora, horas_estimadas, id_prestador } = propostaAceite;

                const queryPrestador = `SELECT * FROM tabela_prestadores WHERE id = ?`;
                const [prestadores]: any = await db.execute(queryPrestador, [id_prestador]);

                if (!Array.isArray(prestadores) || prestadores.length === 0) {
                    continue;
                }

                const prestador = prestadores[0];
                const { taxa_urgencia, minimo_desconto, percentagem_desconto } = prestador;


                let subtotal = preco_hora * horas_estimadas;

                if (taxa_urgencia) {
                    subtotal = subtotal * 1.2;
                }

                if (minimo_desconto !== null && minimo_desconto <= subtotal) {
                    subtotal = subtotal - (subtotal * percentagem_desconto / 100);
                }
                totalGeral += subtotal;
            }
            const queryUpdate = `UPDATE tabela_orcamento SET total = ?, updated_at = ? WHERE id = ?`;
            await db.execute(queryUpdate, [totalGeral, new Date(), idOrcamento]);

            return totalGeral;
        } catch (error) {
            console.log(error);
            return null;
        }
    },

    async updateBudget(id: string, total: number){
        try{
            const rows: any = await db.execute(
                `UPDATE tabela_orcamento SET total = ?, update_at = ? WHERE id = ?`, [total, new Date(), id]
            )
            return rows[0].affectedRows === 0 ? null : rows[0]
        }catch(err){
            console.log(err)
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