import { consult } from "../database/database.js";
import { IBook } from "../interfaces/Book/IBook.js";
import { IBookRepository } from "../interfaces/Book/IBookRepository.js";

export class BookRepository implements IBookRepository {
    async create(book: IBook): Promise<boolean> {
        try {
            const sql = `INSERT INTO tb_books (title, author, img, description, genre, pages, price, is_ebook) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
            const values = [book.title, book.author, book.img, book.description, book.genre, book.pages, book.price, book.is_ebook ? 1 : 0];
            await consult(sql, values);
            return true;
        } catch (error) {
            return false;
        }
    };

    async update(id: number, book: IBook): Promise<boolean> {
        try {
            const sql = `UPDATE tb_books SET title = ?, author = ?, img = ?, description = ?, genre = ?, pages = ?, price = ?, is_ebook = ? WHERE id = ?`;
            const values = [
                book.title,
                book.author,
                book.img,
                book.description,
                book.genre,
                book.pages,
                book.price,
                book.is_ebook ? 1 : 0,
                id
            ];

            await consult(sql, values);

            return true;
        } catch (error) {
            return false;
        }
    }
    async delete(id: number): Promise<boolean> {
        try {
            const sql = `DELETE FROM tb_books WHERE id = ?`;
            const values = [id];

            await consult(sql, values);

            return true;
        } catch (error) {
            return false;
        }
    }
    async findById(id: number): Promise<IBook | false> {
        try {
            const sql = `SELECT * FROM tb_books WHERE id = ?`;
            const values = [id];
            const result = await consult(sql, values);

            if (Array.isArray(result) && result.length > 0) {
                return result[0] as IBook;
            }
            return false;

        } catch (error) {
            return false;
        }
    }
    async findAll(): Promise<boolean | IBook[]> {
        try {
            const sql = `SELECT * FROM tb_books`;
            return await consult(sql, []) as IBook[];
        } catch (error) {
            return false;
        }
    }
}