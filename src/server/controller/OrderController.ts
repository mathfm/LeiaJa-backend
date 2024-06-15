import { OrderService } from "../services/OrderService.js";
import { Request, Response } from 'express';

export class OrderController {
    constructor(private readonly orderService: OrderService) { }
    
    async createOrder(req: Request, res: Response) {
        const { user_id, items, balance, payment_type } = req.body;    
        const user = await this.orderService.create(user_id, items, balance, payment_type);
        return res.status(201).json(user);
    }
}