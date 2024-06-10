import { IUser } from "./IUser.js";

export interface IUserService {
    createUser(user: IUser): void;
    updateUser(id: number, user: IUser): void;
    deleteUser(id: number): void;
    getUserById(id: number): Promise<IUser | boolean>;
}