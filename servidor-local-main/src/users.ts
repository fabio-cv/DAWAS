import { hash } from "node:crypto"
import db from "./lib/db.js"
import type { UserDBType } from "./utils/types.js"
import { generateUUID } from "./utils/uuid.js"
import { hashPassword } from "./utils/password.js"
import { formatDateToDDMMYYYY } from "./utils/date.js"


export async function getUsers() {
    const [rows] = await db.execute("SELECT * FROM tabela_utilizadores")

    return rows
}

export async function getUserById(id: string) {
    // track query execution in function db.execute 
    console.log("getUserById", id)

    try {
        const [rows] = await db.execute(
            `SELECT * FROM tabela_utilizadores 
        WHERE tabela_utilizadores.id = ?`,

            [id]
        )

        if (Array.isArray(rows) && rows.length === 0) return null
        return Array.isArray(rows) ? rows[0] : null
    } catch (err) {
        console.log(err)
        return null
    }
}

export async function createUser(user: UserDBType) {
    try {
        const [rows] = await db.execute(
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
                new Date()
            ]
        )
        console.log({ rows })
        return rows
    } catch (err) {
        console.log(err)
        return null
    }
}



export async function updateUser(id: string, updatedUser: UserDBType) {
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
    }catch (err) {
        console.log(err)
        return null
    }
}