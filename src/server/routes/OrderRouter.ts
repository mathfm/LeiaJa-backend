import { Router } from "express";
import { OrderController } from "../controller/OrderController.js";

export class OrderRouter {
    public router: Router;

    constructor(private readonly orderController: OrderController) {
        this.router = Router();
        this.startRoutes();
    }

    private startRoutes() {
        this.router.post("/order/create", async (req, res) => {
            await this.orderController.createOrder(req, res);
        });

    }
}