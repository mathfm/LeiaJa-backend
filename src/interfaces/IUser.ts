export interface IUser {
    name: string;
    email: string;
    password: string;
    address?: {
        street: string;
        number: string;
        complement?: string;
        city: string;
        state: string;
        country: string;
        zipcode: string;
    } 
}