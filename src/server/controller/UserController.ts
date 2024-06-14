
import { Request, Response } from "express";
import { UserService } from "../services/UserService.js";
import { IUser } from "../interfaces/IUser.js";

export class UserController {    

    constructor(private readonly userService: UserService) {}

    async createUser(req: Request, res: Response) {
        const { name, email, password }: IUser = req.body;
        const user = await this.userService.createUser({ name, email, password });
        return res.status(201).json(user);
    }

    async getUserById(req: Request, res: Response) {
        const { id } = req.params;
        const user = await this.userService.getUserById(Number(id));
        return res.status(200).json(user);
    }

    async updateUser(req: Request, res: Response) {
        const { id } = req.params;
        const { name, email, password } = req.body;
        const user = await this.userService.updateUser(Number(id), { name, email, password });
        return res.status(200).json(user);
    }

    async deleteUser(req: Request, res: Response) {
        const { id } = req.params;
        const user = await this.userService.deleteUser(Number(id));
        return res.status(200).json(user);
    }

}