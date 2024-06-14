import { UserController } from "../controller/UserController.js";
import { UserRepository } from "../repositories/UserRepository.js";
import { UserService } from "../services/UserService.js";

export function createUserController(): UserController {
    const userRepository = new UserRepository();
    const userService = new UserService(userRepository);
    return new UserController(userService);
}