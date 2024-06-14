import { Application } from "express";
import express from 'express';
import { UserRouter } from "./routes/UserRouter.js";
import { createUserController } from "./adapter/createUserController.js";
import { UserController } from "./controller/UserController.js";
import { BookController } from "./controller/BookController.js";
import { BookRouter } from "./routes/BookRouter.js";

export class App {
    public app: Application;

    constructor(
        private readonly userController: UserController,
        private readonly bookController: BookController
    ) {

        this.app = express();
        this.setMiddleware();
        this.setRoutes();
    }
    private setMiddleware() {
        this.app.use(express.json());
    }
    private setRoutes() {
        const userRouter = new UserRouter(this.userController);
        const bookRouter = new BookRouter(this.bookController);
        
        this.app.use(userRouter.router);
        this.app.use(bookRouter.router);

    }
}