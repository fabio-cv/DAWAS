import type { RowDataPacket } from "mysql2";
import db from "../lib/db.js";
import type { PrestacaoServicoDBType, PrestacaoServicoDetalhadoType } from "../utils/types.js";

export const PrestacaoServicoModel = {
    async create(newPrestacaoServico: PrestacaoServicoDBType): Promise<PrestacaoServicoDBType | null> {
        try {
            const query = `INSERT INTO tabela_prestacao_servico VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

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
                newPrestacaoServico.id_utilizador,
                newPrestacaoServico.enabled,
                new Date(),
                new Date(),
            ];

            const [rows] = await db.execute<PrestacaoServicoDBType & RowDataPacket[]>(query, values);

            return rows as PrestacaoServicoDBType;
        } catch (error) {
            console.log(error);
            return null;
        }
    },

    async getAll(): Promise<PrestacaoServicoDBType | null> {
        try {
            const query = `SELECT * FROM tabela_prestacao_servico`;

            const [rows] = await db.execute<PrestacaoServicoDBType & RowDataPacket[]>(query);

            return rows as PrestacaoServicoDBType;
        } catch (error) {
            console.log(error);
            return null;
        }
    },

    async get(id: string): Promise<PrestacaoServicoDBType | null > {
        try {
            const query = `SELECT * FROM tabela_prestacao_servico WHERE id = ?`;

            const value = [id];

            const [rows] = await db.execute<PrestacaoServicoDBType & RowDataPacket[]>(query, value);

            return rows as PrestacaoServicoDBType;
        } catch (error) {
            console.log(error);
            return null;
        }
    },

    async getByIdOrcamento(idOrcamento: string): Promise<PrestacaoServicoDBType | null>{
        try {
            const [rows] = await db.execute<PrestacaoServicoDBType[] & RowDataPacket[]>(`
                SELECT * FROM tbl_prestacao_servico
                WHERE tbl_prestacao_servico.id_orcamento = ?
                `, [idOrcamento])

                if(Array.isArray(rows) && rows.length === 0) return null

                return Array.isArray(rows) ? rows[0] as PrestacaoServicoDBType: null

        }catch(error){
            console.log(error);
            return null
            
        }
    },

    async update(id: string, updatedPrestacaoServico: PrestacaoServicoDBType): Promise<PrestacaoServicoDBType | null> {
        try {
            const query = `UPDATE tabela_prestacao_servico
                        SET
                            designacao=?,
                            subtotal=?,
                            horas_estimadas=?,
                            id_prestador=?,
                            id_servico=?,
                            preco_hora=?,
                            estado=?,
                            id_orcamento=?,
                            enabled=?,
                            updated_at=?
                        WHERE
                            id=?
                        ;`;

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

            const [rows] = await db.execute<PrestacaoServicoDBType & RowDataPacket[]>(query, values);

            return rows as PrestacaoServicoDBType;
        } catch (error) {
            console.log(error);
            return null;
        }
    },

    async delete(id: string) {
        try {
            const query = `DELETE FROM tabela_prestacao_servico WHERE id = ?`;

            const value = [id];

            const rows: any = await db.execute(query, value);

            return rows[0]?.affectedRows === 0 ? null : rows;
        } catch (error) {
            console.log(error);
            return null;
        }
    },
    async getAllPrestacaoServicoDetalhada(limit: number, offset: number): Promise<PrestacaoServicoDetalhadoType | null >{
        try {
            const query = `
            SELECT 
                ps.id as id_prestacao_servico,
                ps.designacao as descricao,
                u.nome as nome_utilizador,
                u.email as email_utilizador,
                s.nome as nome_servico,
                ps.created_at as data_pedido,
                ps.urgente
            FROM tabela_prestacao_servicos ps
            INNER JOIN tabela_utilizadores u ON ps.id_utilizador = u.id
            INNER JOIN tabela_servicos s ON ps.id_servico
            ORDER BY ps.created_at DESC
            LIMIT ? OFFSET ?
            `

            const [rows] = await db.execute<PrestacaoServicoDetalhadoType & RowDataPacket[]>(query, [limit.toString(), offset.toString()])

            if(Array.isArray(rows) && rows.length === 0) return null
            return rows as PrestacaoServicoDetalhadoType
        }catch(error){
            console.log(error);
            return null
            
        }
    }
};
