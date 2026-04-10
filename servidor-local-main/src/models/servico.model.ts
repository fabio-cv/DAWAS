import type { RowDataPacket } from "mysql2";
import db from "../lib/db.js";
import type { ServicoDBType } from "../utils/types.js";

export const ServicoModel = {
    async create(newServico: ServicoDBType): Promise<ServicoDBType | null> {
        try {
            const query = `INSERT INTO tabela_servicos VALUES (?, ?, ?, ?, ?, ?, ?)`;

            const values = [
                null,
                newServico.nome,
                newServico.desconto,
                newServico.categoria,
                newServico.enabled,
                new Date(),
                new Date(),
            ];

            const [rows] = await db.execute<ServicoDBType & RowDataPacket[]>(query, values);

            return rows as ServicoDBType;
        } catch (error) {
            console.log(error);
            return null;
        }
    },


    async getAll(): Promise<ServicoDBType | null> {
        try {
            const query = `SELECT * FROM tabela_servicos`;

            const [rows] = await db.execute<ServicoDBType &  RowDataPacket[]>(query);

            return rows as ServicoDBType;
        } catch (error) {
            console.log(error);
            return null;
        }
    },


    async get(id: string):Promise< ServicoDBType|null>{
        try {
            const query = `SELECT * FROM tabela_servicos WHERE id = ?`;

            const value = [id];

            const [rows] = await db.execute<ServicoDBType & RowDataPacket[]>(query, value);

            return rows as ServicoDBType;
        } catch (error) {
            console.log(error);
            return null;
        }
    },

    async update(id: string, updatedServico: ServicoDBType): Promise<ServicoDBType | null> {
        try {
            const query = `UPDATE tabela_servicos 
                        SET 
                            nome=?,
                            desconto=?,
                            categoria=?,
                            enabled=?,
                            update_at=?
                        WHERE
                            id=?
                        ;`;

            const values = [
                updatedServico.nome,
                updatedServico.desconto,
                updatedServico.categoria,
                updatedServico.enabled,
                new Date(),
                id,
            ];

            const [rows] = await db.execute<ServicoDBType & RowDataPacket[]>(query, values);

            return rows as ServicoDBType;
        } catch (error) {
            console.log(error);
            return null;
        }
    },

    async delete(id: string) {
        try {
            const query = `DELETE FROM tabela_servicos WHERE id = ?`;

            const value = [id];

            const rows: any = await db.execute(query, value);

            return rows[0]?.affectedRows === 0 ? null : rows;
        } catch (error) {
            console.log(error);
            return null;
        }
    }

};
