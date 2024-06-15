import { IAddress } from "../interfaces/IAddress.js";
import { IOrderItems } from "../interfaces/Order/IOrderItems.js";
import { IOrderService } from "../interfaces/Order/IOrderService.js";
import { IOrders, status } from "../interfaces/Order/IOrders.js";
import { OrderRepository } from "../repositories/OrderRepository.js";

export class OrderService implements IOrderService {
    constructor(private readonly orderRepository: OrderRepository) {
        
    }
    async create(user_id: number, items: IOrderItems[], balance: number, payment_type: string, address?: IAddress): Promise<boolean> {
        return await this.orderRepository.create(user_id, items, balance, payment_type, address);
    }

    async update(id:number, status: status) {
        return await this.orderRepository.update(id, status);
    }


    async delete(order_id: number): Promise<boolean> {
        return await this.orderRepository.delete(order_id);
    }
    async getAll(user_id: number): Promise<IOrders[]> {
        return await this.orderRepository.getAll(user_id);
    }

}