import { Genre } from "../utils/generUtil.js";
import { IBook } from "./IBook.js";

export interface IBookService {
    create(book: IBook): Promise<boolean>;
    update(id: number, book: IBook): Promise<boolean>;
    delete(id: number): Promise<boolean>;
    findById(id: number): Promise<IBook | boolean>;
    findAll(): Promise<IBook[] | boolean>;
    findByTitle(title: string): Promise<IBook[] | boolean>;
    findByAuthor(author: string): Promise<IBook[] | boolean>;
    findByGenre(genre: Genre): Promise<IBook[] | boolean>;
}