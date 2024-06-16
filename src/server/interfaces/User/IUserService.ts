import { IUser } from "./IUser.js";

export interface IUserService {
    createUser(user: IUser): void;
    updateUser(id: number, user: IUser): Promise<boolean>;
    deleteUser(id: number): Promise<boolean>;
    getUserById(id: number): Promise<IUser | boolean>;
    login(email: string, password: string): Promise<{ msg: "authorization", token: string } | false>;
}