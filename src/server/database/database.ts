import dotenv from "dotenv";
import mysql from "mysql2";

dotenv.config();

const connection = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    port: Number(process.env.PORT_DATABASE) || 3306
});

export const consult = async (sql: string, values: any[], msgReject = "Ocorreu um erro") => {
    try {
        return await new Promise((resolve, reject) => {
            connection.query(sql, values, (err, result) => {
                if (err) {
                    console.error("Erro na consulta ao banco de dados:", err);
                    reject(`${msgReject}: ${err.message}`);
                } else {
                    resolve(result);
                }
            });
        });
    } catch (error) {
        console.log("Erro ao executar a promessa:", error);
        throw new Error(msgReject);
    }
};

const script = `
    CREATE DATABASE db_leiaja;

    CREATE TABLE IF NOT EXISTS tb_user (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(60),
        email VARCHAR(120),
        password VARCHAR(30)
    );

    CREATE TABLE IF NOT EXISTS tb_books (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        author VARCHAR(255) NOT NULL,
        img VARCHAR(255),
        description TEXT,
        genre ENUM(
            'Ficção Científica',
            'Fantasia',
            'Romance',
            'Suspense',
            'Mistério',
            'Terror',
            'Aventura',
            'História',
            'Biografia',
            'Autoajuda',
            'Poesia',
            'Literatura Clássica',
            'Literatura Contemporânea',
            'Jovem Adulto',
            'Infantil',
            'Não Ficção',
            'Ensaios',
            'Crônicas',
            'Drama',
            'Humor'
        ) NOT NULL,
        pages INT NOT NULL,
        price DECIMAL(10, 2) NOT NULL,
        is_ebook BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    );


    CREATE TABLE IF NOT EXISTS tb_order (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT,
        order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        status ENUM('pending', 'completed', 'cancelled') DEFAULT 'pending',
        total_price DECIMAL(10, 2) NOT NULL,
        payment_type ENUM('credit_card', 'debit_card', 'paypal', 'balance') NOT NULL,
        balance DECIMAL(10, 2) DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES tb_user(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS tb_order_item (
        id INT AUTO_INCREMENT PRIMARY KEY,
        order_id INT,
        book_id INT,
        quantity INT NOT NULL,
        price DECIMAL(10, 2) NOT NULL,
        FOREIGN KEY (order_id) REFERENCES tb_order(id) ON DELETE CASCADE,
        FOREIGN KEY (book_id) REFERENCES tb_books(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS tb_addresses (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        order_id INT NOT NULL,
        street VARCHAR(255) NOT NULL,
        number VARCHAR(50) NOT NULL,
        complement VARCHAR(255),
        city VARCHAR(100) NOT NULL,
        state VARCHAR(100) NOT NULL,
        country VARCHAR(100) NOT NULL,
        zipcode VARCHAR(20) NOT NULL,
        FOREIGN KEY (user_id) REFERENCES tb_user(id),
        FOREIGN KEY (order_id) REFERENCES tb_order(id)
    );


    `

await consult(script, []);