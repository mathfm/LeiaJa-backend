import jwt from "jsonwebtoken";
import { IUser } from "../interfaces/User/IUser.js";
import { IUserService } from "../interfaces/User/IUserService.js";
import { UserRepository } from "../repositories/UserRepository.js";


export class UserService implements IUserService {

    constructor(private readonly userRepository: UserRepository) { }
    async updateUser(id: number, user: IUser): Promise<boolean> {
        return await this.userRepository.update(id, user);
    }
    async deleteUser(id: number): Promise<boolean> {
        return await this.userRepository.delete(id);
    }
    async getUserById(id: number): Promise<false | IUser> {
        return await this.userRepository.findById(id);
    }

    async createUser({ email, name, password }: IUser) {
        try {
            await this.userRepository.create({ email, name, password })
            return "Registro criado com sucesso";
        } catch (error) {
            return error;
        }
    }

    async login(email: string, password: string): Promise<{ msg: "authorization"; token: string; } | false> {
        try {
            if (await this.userRepository.login(email, password)) {

                const secret = process.env.TOKEN as string;
                const token = jwt.sign({ email }, secret);

                return { msg: "authorization", token: token }; 

            }

            return false;
        } catch (error) {
            throw new Error("Falha a tentar executar o login");
        }
        
    }

}