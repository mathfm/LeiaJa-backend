import { consult } from "../database/database.js";
import { IUser } from "../interfaces/IUser.js";
import { IUserRepository } from "../interfaces/IUserRepository.js";



export class UserRepository implements IUserRepository {
    constructor() {}
    async create({ name, email, password }: IUser) {
        const sql = `INSERT INTO tb_user (name, email, password) VALUES (?, ?, ?)`;
        const values = [name, email, password];
        return consult(sql, values, "Ocorreu um erro ao registrar esse usuario");
    }

    async update(id: number, user: IUser): Promise<boolean> {
        return true;
    }

    async delete(id: number): Promise<boolean> {
        const sql = `DELETE FROM tb_user (name, email, password) WHERE id = ?`;
        const values = [id];
        consult(sql, values, "Não foi possivel deletar o registro");
        return true;
    }


    async findById(id: number): Promise<IUser | false> {
    const sql = `SELECT * FROM tb_user WHERE id = ?`;
    const values = [id];

    try {
        const result = await consult(sql, values, "Id não localizado");

        // Verifique se há resultados
        if (Array.isArray(result) && result.length > 0) {
            return result[0] as IUser; // Retorna o primeiro usuário encontrado
        } else {
            return false; // Retorna falso se nenhum usuário for encontrado
        }
    } catch (error) {
        console.error("Erro ao consultar usuário por ID:", error);
        return false; // Retorna falso se ocorrer um erro
    }
}

    

}