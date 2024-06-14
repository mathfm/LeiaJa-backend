import { IBook } from '../interfaces/IBook.js';
import { BookRepository } from '../repositories/BookRepository.js';
import { IBookService } from '../interfaces/IBookService.js';
import { Genre } from '../utils/generUtil.js';
export class BookService implements IBookService {

    constructor(private readonly bookRepository: BookRepository) { }
    async create(book: IBook): Promise<boolean> {
        return await this.bookRepository.create(book);
    }
    async update(id: number, book: IBook): Promise<boolean> {
        return await this.bookRepository.update(id, book);
    }
    async delete(id: number): Promise<boolean> {
        return await this.bookRepository.delete(id);
    }
    async findById(id: number): Promise<boolean | IBook> {
        return await this.bookRepository.findById(id);
    }
    async findAll(): Promise<boolean | IBook[]> {
        return await this.bookRepository.findAll();
    }
    async findByTitle(title: string): Promise<boolean | IBook[]> {
        return await this.bookRepository.findByTitle(title);
    }
    async findByAuthor(author: string): Promise<boolean | IBook[]> {
        return await this.bookRepository.findByAuthor(author);
    }
    async findByGenre(genre: Genre): Promise<boolean | IBook[]> {
        return await this.bookRepository.findByGenre(genre);
    }
    
    
}