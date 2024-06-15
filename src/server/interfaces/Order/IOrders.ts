export interface IOrders {
    user_id: string;
    order_date: Date;
    status: ("pedding" | "completed" | "cancelled");
    payment_type: 'credit_card' | 'debit_card' | 'paypal' | 'balance';
    total_price: number;
    balance: number
}

export type status = IOrders["status"];