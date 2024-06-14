import { Genre } from '../utils/generUtil.js';
export interface IBook {
    title: string;
    author: string;
    img: string;
    description: string;
    genre: Genre;
    pages: number;
    price: number;
    is_ebook: boolean;
}