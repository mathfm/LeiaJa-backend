import { OrderService } from "../services/OrderService.js";
import { Request, Response } from 'express';

export class OrderController {
    constructor(private readonly orderService: OrderService) { }
    
    async createOrder(req: Request, res: Response) {
        const { user_id, items, balance, payment_type, address } = req.body;    
        const user = await this.orderService.create(user_id, items, balance, payment_type, address);
        return res.status(201).json(user);
    }

    async getAllOrder(req: Request, res: Response) {
        const { user_id } = req.params;
        const user = await this.orderService.getAll(Number(user_id));
        return res.status(200).json(user);
    }

    async deleteOrder(req: Request, res: Response) {
        const { id } = req.params;
        const user = await this.orderService.delete(Number(id));
        return res.status(200).json(user);
    }

    async updateOrder(req: Request, res: Response) {
        const { id } = req.params;
        const { status } = req.body;
        const user = await this.orderService.update(Number(id), status);
        return res.status(200).json(user);
    }

}