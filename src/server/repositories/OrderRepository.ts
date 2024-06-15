import { consult } from "../database/database.js";
import { IBook } from "../interfaces/IBook.js";
import { IOrderItems } from "../interfaces/IOrderItems.js";
import { IOrderRepository } from "../interfaces/IOrderRepository.js";
import { IOrders } from "../interfaces/IOrders.js";


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
    async create(user_id: number, items: IOrderItems[], balance: number, payment_type: string): Promise<boolean> {

        
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

            return true;
        } catch (error) {
            console.log(error);
            
            return false;
        }
    }
    
    async delete(order: IOrders): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    async getAll(orderId: number): Promise<IBook[]> {
        throw new Error("Method not implemented.");
    }
    

}