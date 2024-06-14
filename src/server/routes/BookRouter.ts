import { Router } from "express";
import { BookController } from '../controller/BookController.js';

export class BookRouter {
    public router: Router;

    constructor(private readonly bookController: BookController) {
        this.router = Router();
        this.startRoutes();
    }

    private startRoutes() {
        this.router.post("/books/create", async (req, res) => {
            await this.bookController.createBook(req, res)
        });

        this.router.get("/books/:id", async (req, res) => {
            await this.bookController.getBook(req, res)
        });

        this.router.get("/books", async (req, res) => {
            await this.bookController.getAllbooks(req, res)
        });

        this.router.put("/books/:id/update", async (req, res) => {
            await this.bookController.updateBook(req, res)
        });

        this.router.delete("/books/:id/delete", async (req, res) => {
            await this.bookController.deleteBook(req, res)
        });

    }

}