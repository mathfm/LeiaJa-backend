import { IBook } from "./IBook.js";
import { IOrderItems } from "./IOrderItems.js";
import { IOrders } from "./IOrders.js";

export interface IOrderRepository {
    create(user_id: number, items: IOrderItems[], balance: number, payment_type: string): Promise<boolean>;
    delete(order: IOrders): Promise<boolean>;
    getAll(orderId: number): Promise<IBook[]>;
}