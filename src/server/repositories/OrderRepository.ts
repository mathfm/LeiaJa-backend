import { consult } from "../database/database.js";
import { IBook } from "../interfaces/Book/IBook.js";
import { IAddress } from "../interfaces/IAddress.js";
import { IOrderItems } from "../interfaces/Order/IOrderItems.js";
import { IOrderRepository } from "../interfaces/Order/IOrderRepository.js";
import { IOrders, status } from "../interfaces/Order/IOrders.js";


interface ResultSetHeader {
    fieldCount: number;
    affectedRows: number;
    insertId: number;
    info: string;
    serverStatus: number;
    warningStatus: number;
    changedRows: number;
}

export class OrderRepository implements IOrderRepository {
    async create(user_id: number, items: IOrderItems[], balance: number, payment_type: string, address?: IAddress): Promise<boolean> {
        
        try {
            let totalPrice = 0;
            for (const item of items) {
                const book: unknown = await consult(`SELECT price FROM tb_books WHERE id = ?`, [item.book_id]);
                const bookFilter: IBook[] = book as IBook[];
                if (bookFilter.length > 0) {
                    totalPrice += bookFilter[0].price * item.quantity;
                } else {
                    throw new Error(`Livro com ID ${item.book_id} não encontrado.`);
                }
            }

            if (balance < totalPrice) {
                throw new Error("Saldo insuficiente");
            }

            const sql = `
                INSERT INTO tb_order (user_id, status, total_price, payment_type, balance) 
                VALUES (?, 'pending', ?, ?, ?)
            `;
            const values = [user_id, totalPrice, payment_type, balance];
            const result = await consult(sql, values);
            const { insertId } = result as ResultSetHeader;
            const orderId = insertId;
            
            for (const item of items) {
                await consult('INSERT INTO tb_order_item (order_id, book_id, quantity, price) VALUES (?, ?, ?, ?)', [orderId, item.book_id, item.quantity, item.price]);
            }

            if (address) {
                const addressSql = `
                    INSERT INTO tb_addresses (user_id, order_id, street, number, complement, city, state, country, zipcode) 
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
                `;
    
                const addressValues = [user_id, orderId, address.street, address.number, address.complement, address.city, address.state, address.country, address.zipcode];
    
                await consult(addressSql, addressValues);
                
            }


            return true;
        } catch (error) {            
            return false;
        }
    }

    async update(id: number, status: status) {
        try {
            const sql = 'UPDATE tb_order SET status = ? WHERE id =?';
            const values = [status, id];
            await consult(sql, values);
            return true;
        } catch (error) {
            return false;
        }
    }
    
    async delete(order_id: number): Promise<boolean> {
        try {
            const sql = 'DELETE FROM tb_order WHERE id = ?';
            const values = [order_id];
            await consult(sql, values);
            return true;
        } catch (error) {
            return false;
        }
    }
    async getAll(user_id: number): Promise<IOrders[]> {
        const sql = "SELECT * FROM tb_order WHERE user_id = ?";
        const values = [user_id];
        const result = await consult(sql, values);
        const orderFilter: IOrders[] = result as IOrders[];
        return orderFilter;
    }
    

}