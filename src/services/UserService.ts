import { IUser } from "../interfaces/IUser.js";
import { IUserService } from "../interfaces/IUserService.js";
import { UserRepository } from "../repositories/UserRepository.js";

export class UserService implements IUserService {

    constructor(private readonly userRepository: UserRepository) {}
    updateUser(id: number, user: IUser): void {
        throw new Error("Method not implemented.");
    }
    deleteUser(id: number): void {
        throw new Error("Method not implemented.");
    }
    getUserById(id: number): Promise<boolean | IUser> {
        throw new Error("Method not implemented.");
    }

    async createUser({ email, name, password }: IUser) {
        await this.userRepository.create({email, name, password})
        return "Registro criado com sucesso";
    }



}