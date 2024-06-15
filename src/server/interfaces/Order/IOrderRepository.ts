import { IAddress } from "../IAddress.js";
import { IOrderItems } from "./IOrderItems.js";
import { IOrders, status } from "./IOrders.js";

export interface IOrderRepository {
    create(user_id: number, items: IOrderItems[], balance: number, payment_type: string, address?: IAddress): Promise<boolean>;
    update(id: number, status: status): Promise<boolean>;
    delete(order_id: number): Promise<boolean>;
    getAll(user_id: number): Promise<IOrders[]>;
}