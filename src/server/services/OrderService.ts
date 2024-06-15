import { IBook } from "../interfaces/IBook.js";
import { IOrderItems } from "../interfaces/IOrderItems.js";
import { IOrderService } from "../interfaces/IOrderService.js";
import { OrderRepository } from "../repositories/OrderRepository.js";

export class OrderService implements IOrderService {
    constructor(private readonly orderRepository: OrderRepository) {
        
    }
    async create(user_id: number, items: IOrderItems[], balance: number, payment_type: string): Promise<boolean> {
        return await this.orderRepository.create(user_id, items, balance, payment_type);
    }
    async delete(user_id: number): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    async getAll(orderId: number): Promise<IBook[]> {
        throw new Error("Method not implemented.");
    }

}