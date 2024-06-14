import { Router, Request, Response } from 'express';
import { UserController } from "../controller/UserController.js";

export class UserRouter {
    public router: Router;

    constructor(private readonly userController: UserController) {
        this.router = Router();
        this.startRoutes();
    }

    private startRoutes() {
        this.router.post("/user/create", async (req: Request, res: Response) => {
            await this.userController.createUser(req, res);
        });

        this.router.get("/user/:id", async (req: Request, res: Response) => {
            await this.userController.getUserById(req, res);
        });

        this.router.put("/user/:id/update", async (req: Request, res: Response) => {
            await this.userController.updateUser(req, res);
        });

        this.router.delete("/user/:id/delete", async (req: Request, res: Response) => {
            await this.userController.deleteUser(req, res);
        });
    }
}