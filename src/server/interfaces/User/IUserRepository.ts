import { IUser } from "./IUser.js";

export interface IUserRepository {
    create(user: IUser): Promise<void>;
    update(id: number, user: IUser): Promise<boolean>;
    delete(id: number): Promise<boolean>;
    findById(id: number): Promise<IUser | boolean>;
    login(email: string, password: string): Promise<Boolean>;
}