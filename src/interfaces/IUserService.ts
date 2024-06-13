import { IUser } from "./IUser.js";

export interface IUserService {
    createUser(user: IUser): void;
    updateUser(id: number, user: IUser): Promise<boolean>;
    deleteUser(id: number): Promise<boolean>;
    getUserById(id: number): Promise<IUser | boolean>;
    
}