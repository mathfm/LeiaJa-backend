import request  from "supertest";
import { describe, it, expect, beforeEach, vi } from "vitest";

// import { IUser } from "../../interfaces/IUser.js";
// import { App } from "../../app.js";
// import { UserController } from "../UserController.js";
import express from 'express';
import { UserService } from "../../services/UserService.js";
import { UserController } from "../UserController.js";
import { UserRouter } from "../../routes/UserRouter.js";


// const mockController = vi.fn();

// describe('UserController', () => {
//     const app = new App(mockController as UserController);
//     beforeEach(() => {
//         vi.clearAllMocks();
        
//     })
    
//     it('should create a new user', async () => {
//         const newUser:IUser = {
//             name: "teste123",
//             email: "teste@gmail.com",
//             password: "12345"
//         }
//         const response = await request(app.app)
//             .post('/user/create')
//             .send(newUser)
//             .expect(201);
            

        

//         expect(response.body).toEqual("Registro criado com sucesso");
//     });

// });
describe('UserController', () => {
    let app: express.Application;
    let userService: UserService;
    let userController: UserController;

    beforeEach(() => {
        userService = {
            createUser: vi.fn().mockResolvedValue("Registro criado com sucesso"),
            
        } as unknown as UserService;

        userController = new UserController(userService);
        const userRouter = new UserRouter(userController);

        app = express();
        app.use(express.json());
        app.use(userRouter.router);
    });

    it('should create a new user', async () => {
        const newUser = {
            name: "teste",
            email: "teste@gmail.com",
            password: "12345"
        };

        const response = await request(app)
            .post('/user/create')
            .send(newUser);

        expect(response.status).toBe(201);
        expect(response.body).toEqual("Registro criado com sucesso");
        expect(userService.createUser).toHaveBeenCalledWith({ name: "teste", email: "teste@gmail.com", password: "12345" });
    });
});