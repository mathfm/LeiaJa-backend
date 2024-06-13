import { IUser } from "../interfaces/IUser.js";
import { IUserService } from "../interfaces/IUserService.js";
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
}