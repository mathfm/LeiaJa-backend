import { consult } from "../database/database.js";
import { IUser } from "../interfaces/IUser.js";
import { IUserRepository } from "../interfaces/IUserRepository.js";



export class UserRepository implements IUserRepository {
    constructor() {}
    async create({ name, email, password }: IUser) {
        const sql = `INSERT INTO tb_user (name, email, password) VALUES (?, ?, ?)`;
        const values = [name, email, password];
        await consult(sql, values, "Ocorreu um erro ao registrar esse usuario");
    }

    async update(id: number, user: IUser): Promise<boolean> {
        const sql = `UPDATE tb_user SET name = ?, email = ?, password = ? WHERE id = ?`;
        const values = [user.name, user.email, user.password, id];
        try {
            await consult(sql, values, "Não foi possivel atualizar os dados");
            return true;
        } catch (error) {
            return false;
        }
    }

    async delete(id: number): Promise<boolean> {
        const sql = `DELETE FROM tb_user WHERE id = ?`;
        const values = [id];
        try {
            await consult(sql, values, "Não foi possivel deletar o registro");
            return true;
        } catch (error) {
            return false;
        }
    }

    async findById(id: number): Promise<IUser | false> {
    const sql = `SELECT * FROM tb_user WHERE id = ?`;
    const values = [id];

    try {
        const result = await consult(sql, values, "Id não localizado");
        if (Array.isArray(result) && result.length > 0) {
            return result[0] as IUser;
        } else {
            return false; 
        }
    } catch (error) {
        return false; 
    }
}

}