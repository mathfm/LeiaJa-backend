import { BookController } from '../controller/BookController.js';
import { BookRepository } from '../repositories/BookRepository.js';
import { BookService } from '../services/BookService.js';

export function createBookController() {
    const bookRepository = new BookRepository();
    const bookService = new BookService(bookRepository);
    return new BookController(bookService);
}