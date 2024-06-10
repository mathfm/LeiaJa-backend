import { UserService } from "../services/UserService.js";
import { Request, Response } from "express";
import { UserRepository } from '../repositories/UserRepository.js';

export class UserController {    
    // async createUser(req: Request, res: Response) {
    //     const { name, email, password } = req.body;
    //     const user = await this.userService.createUser({ name, email, password });
    //     return res.status(201).json(user);
    // }
}