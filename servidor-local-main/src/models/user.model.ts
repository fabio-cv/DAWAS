import type { RowDataPacket } from "mysql2";
import db from "../lib/db.js";
import { formatDateToDDMMYYYY } from "../utils/date.js";
import { hashPassword } from "../utils/password.js";
import type { UserDBType } from "../utils/types.js";
import { generateUUID } from "../utils/uuid.js";

export const UsersModel = {
    async create(user: UserDBType): Promise<UserDBType | null> {
        try {
            const [rows] = await db.execute <UserDBType & RowDataPacket[]>(
                `INSERT INTO tabela_utilizadores 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                [
                    generateUUID(),
                    user.nome,
                    user.numero_identificacao,
                    formatDateToDDMMYYYY(user.data_nascimento),
                    user.email,
                    user.telefone,
                    user.pais,
                    user.localidade,
                    await hashPassword(user.password),
                    user.enabled,
                    new Date(),
                    new Date(),
                ],
            );
            console.log({ rows });
            return rows as UserDBType;
        } catch (err) {
            console.log(err);
            return null;
        }
    },

    async getAll() {
        const [rows] = await db.execute("SELECT * FROM tabela_utilizadores");

        return rows;
    },

    async get(id: string) {
        console.log("getUserById", id);

        try {
            const [rows] = await db.execute(
                `SELECT * FROM tabela_utilizadores 
        WHERE tabela_utilizadores.id = ?`,

                [id],
            );

            if (Array.isArray(rows) && rows.length === 0) return null;
            return Array.isArray(rows) ? rows[0] : null;
        } catch (err) {
            console.log(err);
            return null;
        }
    },
    //Ex-1
    async getById(id: string): Promise<UserDBType | null>{
        try {
            const [rows] = await db.execute(
                `SELECT * FROM tabela_utilizadores
                WHERE tabela_utilizadores.id = ?`, [id]
            )
            if(Array.isArray(rows) && rows.length === 0) return null
            return Array.isArray(rows) ? rows[0] as UserDBType : null
        } catch (error) {
            console.log(error)
            return null
        }
    },

    async getByEmail(email: string): Promise<UserDBType | null>{
        try {
            const [rows] = await db.execute(
                `SELECT * FROM tabela_utilizadores
                WHERE tabela_utilizadores.email = ?`, [email]
            )
            if(Array.isArray(rows) && rows.length === 0) return null
            return Array.isArray(rows) ? rows[0] as UserDBType : null
        } catch (error) {
            console.log(error)
            return null
        }
    },


    async update(id: string, updatedUser: UserDBType) {
        try {
            const query = `
        UPDATE tabela_utilizadores
        SET
            nome=?,
            numero_identificacao=?,
            data_nascimento=?,
            email=?,
            telefone=?,
            pais=?,
            localidade=?,
            password=?,
            enabled=?,
            updated_at=?
        WHERE id=?
        `

            const values = [
                updatedUser.nome,
                updatedUser.numero_identificacao,
                formatDateToDDMMYYYY(updatedUser.data_nascimento),
                updatedUser.email,
                updatedUser.telefone,
                updatedUser.pais,
                updatedUser.localidade,
                await hashPassword(updatedUser.password), //não é correto atualizar a password desta forma, depois mudamos...
                updatedUser.enabled,
                new Date(),
                id
            ]

            const rows = await db.execute(query, values)
            return Array.isArray(rows) && rows.length > 0 ? rows[0] : null
        } catch (err) {
            console.log(err)
            return null
        }
    },

    //Ex-1
    async updatePassword(id: string, newPwd: string){
        try{
            const query = `
            UPDATE tabela_utilizadores
            SET
                password=?
            WHERE id=?
            ` 
            const values = [newPwd, id]

            const rows = await db.execute(query, values)
            return Array.isArray(rows) && rows.length > 0 ? rows[0] : null

        }catch(error){
            console.log(error);
            return null
            
        }
    },

    async delete(id: string) {
        try {
            const query = `DELETE FROM tabela_utilizadores WHERE id = ?`;

            const value = [id];

            const rows: any = await db.execute(query, value);

            return rows[0]?.affectedRows === 0 ? null : rows;
        } catch (error) {
            console.log(error);
            return null;
        }
    }
};
