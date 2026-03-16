import db from "./lib/db.js";
import type { UserType } from "./utils/types.js";


//funcao para obter todos os utilizaodores
export async function getUsers() {
    const [rows] = await db.execute("SELECT * FROM tabela_utilizadores")

    console.log(rows);
    return rows;

}

//funcao para obter utilizador pelo seu id
export async function getUserById(id: string) {
    const [rows] = await db.execute(
        `SELECT * FROM tabela_utilizadores
        WHERE tabela_utilizadores.id = ?
        `, [id]
    )

    if (Array.isArray(rows) && rows.length == 0) return null

    return Array.isArray(rows) ? rows[0] : null
}


//funcao para criar utilizador
export async function createUser(user: UserType) {

    try {
        const [rows] = await db.execute(
            `INSERT INTO tabela_utilizadores
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [user.id, user.nome, user.numero_identificacao, user.data_nascimento, user.email, user.telefone, 
                user.pais, user.localidade, user.password, user.enabled, new Date, new Date]
        )
        console.log({ rows });
        return rows
    }catch (err){
        console.log(err);
        return null
        
    }

}