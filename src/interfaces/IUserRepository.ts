import { IUser } from "./IUser.js";

export interface IUserRepository {
    create(user: IUser): void;
    update(id: number, user: IUser): Promise<boolean>;
    delete(id: number): Promise<boolean>;
    findById(id: number): Promise<IUser | boolean>;
}