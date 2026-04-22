import type { RowDataPacket } from "mysql2";
import type { EmpresaDBType } from "../utils/types.js";
import db from "../lib/db.js";



export const EmpresaModel = {
    async create(newEmpresa: EmpresaDBType): Promise<EmpresaDBType | null> {
        try {
            const query = `
            INSERT INTO tabela_empresa (
                designacao,
                descricao,
                nif,
                icone,
                id_utilizador,
                localidade,
                enabled,
                created_at,
                updated_at
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`

            const values = [
                newEmpresa.designacao,
                newEmpresa.descricao,
                newEmpresa.nif,
                newEmpresa.icone,
                newEmpresa.id_utilizador,
                newEmpresa.localizacao,
                newEmpresa.enabled,
                new Date(),
                new Date(),
            ]

            const [rows] = await db.execute<EmpresaDBType & RowDataPacket[]>(query, values);
            return rows;
        } catch (error) {
            console.log(error);
            return null;
        }
    },

    async get(id: string): Promise<EmpresaDBType | null> {
        try {
            const query = `
            SELECT 
                tabela_empresa.id,
                tabela_empresa.designacao,
                tabela_empresa.descricao,
                tabela_empresa.nif,
                tabela_empresa.icone,
                tabela_empresa.id_utilizador,
                tabela_empresa.localidade,
                tabela_empresa.enabled,
                tabela_empresa.created_at,
                tabela_empresa.updated_at
            FROM tabela_empresa
            WHERE id = ?
            `

            const value = [id];

            const [rows] = await db.execute<EmpresaDBType & RowDataPacket[]>(query, value);
            return Array.isArray(rows) && rows.length > 0 ? rows[0] as EmpresaDBType : null;
        } catch (error) {
            console.log(error);
            return null;
        }
    },

    async getAll(): Promise<EmpresaDBType[] | null> {
        try {
            const query = `
            SELECT 
                tabela_empresa.id,
                tabela_empresa.designacao,
                tabela_empresa.descricao,
                tabela_empresa.nif,
                tabela_empresa.icone,
                tabela_empresa.id_utilizador,
                tabela_empresa.localidade,
                tabela_empresa.enabled,
                tabela_empresa.created_at,
                tabela_empresa.updated_at
            FROM tabela_empresa
            `

            const [rows] = await db.execute<EmpresaDBType[] & RowDataPacket[]>(query);
            return Array.isArray(rows) && rows.length > 0 ? rows as EmpresaDBType[] : null;
        } catch (error) {
            console.log(error);
            return null;
        }
    },

    async update(id: string, updatedEmpresa: EmpresaDBType): Promise<EmpresaDBType | null> {
        try {
            const query = `
            UPDATE tabela_empresa
            SET 
                designacao = ?,
                descricao = ?,
                nif = ?,
                icone = ?,
                id_utilizador = ?,
                localidade = ?,
                enabled = ?,
                updated_at = ?
            WHERE id = ?
            `

            const values = [
                updatedEmpresa.designacao,
                updatedEmpresa.descricao,
                updatedEmpresa.nif,
                updatedEmpresa.icone,
                updatedEmpresa.id_utilizador,
                updatedEmpresa.localizacao,
                updatedEmpresa.enabled,
                new Date(),
                id,
            ]

            const [rows] = await db.execute<EmpresaDBType & RowDataPacket[]>(query, values);
            return rows;
        } catch (error) {
            console.log(error);
            return null;
        }
    },

    async delete(id: string): Promise<EmpresaDBType | null> {
        try {
            const query = `
            DELETE FROM tabela_empresa
            WHERE id = ?
            `

            const value = [id];

            const [rows] = await db.execute<EmpresaDBType & RowDataPacket[]>(query, value);
            return Array.isArray(rows) && rows.length > 0 ? rows[0] as EmpresaDBType : null;
        } catch (error) {
            console.log(error);
            return null;
        }
    },
}