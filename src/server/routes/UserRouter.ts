import { Router, Request, Response } from 'express';
import { UserController } from "../controller/UserController.js";
import { checkToken } from '../middlwares/checkToken.js';

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

        this.router.get("/user/:id", checkToken, async (req: Request, res: Response) => {
            await this.userController.getUserById(req, res);
        });

        this.router.put("/user/:id/update", checkToken, async (req: Request, res: Response) => {
            await this.userController.updateUser(req, res);
        });

        this.router.delete("/user/:id/delete", checkToken, async (req: Request, res: Response) => {
            await this.userController.deleteUser(req, res);
        });

        this.router.post("/user/login", async (req: Request, res: Response) => {
            await this.userController.login(req, res);
        });

    }
}