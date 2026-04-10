import type { RowDataPacket } from "mysql2";
import db from "../lib/db.js";
import type { PrestadorDBType } from "../utils/types.js";

export const PrestadorModel = {
    async create(newPrestador: PrestadorDBType): Promise<PrestadorDBType | null> {
        try {
            const query = `INSERT INTO tabela_prestadores VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

            const values = [
                null,
                newPrestador.nif,
                newPrestador.profissao,
                newPrestador.taxa_urgencia,
                newPrestador.minimo_desconto,
                newPrestador.percentagem_desconto,
                newPrestador.enabled,
                new Date(),
                new Date()
            ];

            const [rows] = await db.execute<PrestadorDBType & RowDataPacket[]>(query, values);

            return rows as PrestadorDBType;
        } catch (error) {
            console.log(error);
            return null;
        }
    },

    async getAll(): Promise<PrestadorDBType | null> {
        try {
            const query = `SELECT * FROM tabela_prestadores`;

            const [rows] = await db.execute<PrestadorDBType & RowDataPacket[]>(query);

            return rows as PrestadorDBType;
        } catch (error) {
            console.log(error);
            return null;
        }
    },

    async get(id: string): Promise<PrestadorDBType | null> {
        try {

            const [rows] = await db.execute(
                `SELECT * FROM tabela_prestadores WHERE id = ?`,
                [id]
            )
        if(Array.isArray(rows) && rows.length === 0) return null

            return Array.isArray(rows) ? rows[0] as PrestadorDBType : null;
        } catch (error) {
            console.log(error);
            return null;
        }
    },

    async update(id: string, updatedPrestador: PrestadorDBType): Promise<PrestadorDBType | null>{
        try {
            const query = `UPDATE tabela_prestadores
                        SET
                            nif=?,
                            profissao=?,
                            taxa_urgencia=?,
                            minimo_desconto=?,
                            percentagem_desconto=?,
                            disponivel=?,
                            enabled=?,
                            updated_at=?
                        WHERE
                            id=?
                        ;`;

            const values = [
                updatedPrestador.nif,
                updatedPrestador.profissao,
                updatedPrestador.taxa_urgencia,
                updatedPrestador.minimo_desconto,
                updatedPrestador.percentagem_desconto,
                updatedPrestador.enabled,
                new Date(),
                id,
            ];

            const [rows] = await db.execute<PrestadorDBType & RowDataPacket[]>(query, values);

            return rows as PrestadorDBType;
        } catch (error) {
            console.log(error);
            return null;
        }
    },

    async delete(id: string): Promise<PrestadorDBType | null> {
        try {
            const query = `DELETE FROM tabela_prestadores WHERE id = ?`;

            const value = [id];

            const [rows] = await db.execute<PrestadorDBType & RowDataPacket[]>(query, value);

            return rows as PrestadorDBType;
        } catch (error) {
            console.log(error);
            return null;
        }
    }
};
