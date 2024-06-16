import { IBook } from "../interfaces/Book/IBook.js";
import { BookService } from "../services/BookService.js";
import { Request, Response } from 'express';


export class BookController {
    constructor(private readonly bookService: BookService) { }
    

    async createBook(req: Request, res: Response) {
        const { title, author, genre, description, img, is_ebook, pages, price } = req.body;
        const book: IBook = { title, author, genre, description, img, is_ebook, pages, price };
        await this.bookService.create(book);
        return res.status(201).json(book);
    }

    async getBook(req: Request, res: Response) { 
        const { id } = req.params;
        const book = await this.bookService.findById(Number(id));
        return res.json(book);
    }

    async getAllbooks(req: Request, res: Response) {
        const books = await this.bookService.findAll();
        return res.json(books);
    } 

    async deleteBook(req: Request, res: Response) {
        const { id } = req.params;
        const book = await this.bookService.delete(Number(id));
        return res.json(book);
    }

    async updateBook(req: Request, res: Response) {
        const { id } = req.params;
        const { title, author, genre, description, img, is_ebook, pages, price } = req.body;
        const book: IBook = { title, author, genre, description, img, is_ebook, pages, price };
        const bookUpdated = await this.bookService.update(Number(id), book);
        return res.json(bookUpdated);
    }

}