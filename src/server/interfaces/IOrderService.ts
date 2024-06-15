import { IBook } from "./IBook.js";
import { IOrderItems } from "./IOrderItems.js";

export interface IOrderService {
    create(user_id: number, item: IOrderItems[], balance: number, payment_type: string): Promise<boolean>;
    delete(user_id: number): Promise<boolean>;
    getAll(orderId: number): Promise<IBook[]>;
}