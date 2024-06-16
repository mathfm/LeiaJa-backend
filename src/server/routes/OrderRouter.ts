import { Router } from "express";
import { OrderController } from "../controller/OrderController.js";
import { checkToken } from "../middlwares/checkToken.js";

export class OrderRouter {
    public router: Router;

    constructor(private readonly orderController: OrderController) {
        this.router = Router();
        this.startRoutes();
    }

    private startRoutes() {
        this.router.post("/order/create", checkToken, async (req, res) => {
            await this.orderController.createOrder(req, res);
        });

        this.router.get("/orders/:user_id", checkToken, async (req, res) => {
            await this.orderController.getAllOrder(req, res);
        });

        this.router.delete("/order/:id/delete", checkToken, async (req, res) => {
            await this.orderController.deleteOrder(req, res);
        });

        this.router.put("/order/:id/update", checkToken, async (req, res) => {
            await this.orderController.updateOrder(req, res);
        });

    }
}