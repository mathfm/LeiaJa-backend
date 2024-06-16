import { IAddress } from "../IAddress.js";
import { IOrderItems } from "./IOrderItems.js";
import { IOrders, status } from "./IOrders.js";

export interface IOrderService {
    create(user_id: number, item: IOrderItems[], balance: number, payment_type: string, address?: IAddress): Promise<boolean>;
    update(id:number, status: status): Promise<boolean>;
    delete(user_id: number): Promise<boolean>;
    getAll(user_id: number): Promise<IOrders[]>;
    
}