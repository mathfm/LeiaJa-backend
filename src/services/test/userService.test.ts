import { expect, it, vi, describe, beforeEach } from 'vitest'
import { UserService } from '../UserService.js';
import { UserRepository } from '../../repositories/UserRepository.js';
import { IUser } from '../../interfaces/IUser.js';



const users: IUser[] = [];
const mockUserRepository = {
    create: vi.fn((user: IUser) => {
        
        users.push({
            id: users.length + 1,
            name: user.name,
            email: user.email,
            password:  user.password,
        });
        return Promise.resolve();
    }),

    update: vi.fn((id: number, user: IUser) => {
        const index = users.findIndex(u => u.id === id);
        if (index !== -1) {
            users[index] = { ...users[index], ...user };
            return Promise.resolve(true);
        }
        return Promise.resolve(false);
    }),

    delete: vi.fn((id: number) => {
        const index = users.findIndex(u => u.id === id);
        if (index !== -1) {
            users.splice(index, 1);
            return Promise.resolve(true);
        }
        return Promise.resolve(false);
    }),

    findById: vi.fn((id: number) => {
        const user = users.find(u => u.id === id);
        return Promise.resolve(user ? user : false);
    }),
    
    findByEmail: vi.fn((email: string) => {
        const user = users.find(u => u.email === email);
        return Promise.resolve(user ? user : false);
    }),

};

const userService = new UserService(mockUserRepository as UserRepository)

describe('#User Suite', () => {
    beforeEach(() => {
        users.length = 0;
        vi.clearAllMocks();
    })

    describe('create', () => {
        it('should verify create is valid', async () => {
            const newUser = {
                name: "teste",
                email: "teste@gmail.com",
                password: "123"
            }

            const result = await userService.createUser(newUser);

            expect(result).toBe("Registro criado com sucesso");
            expect(mockUserRepository.create).toHaveBeenCalledWith(newUser);
            expect(users[0].email).toBe(newUser.email);
            expect(mockUserRepository.create).toHaveBeenCalledTimes(1);
                    
        });

        it('should verify create is invalid', async () => {
            const newUser = {
                name: "teste",
                email: "teste@gmail.com",
                password: "123"
            }

            mockUserRepository.create.mockRejectedValueOnce("Ocorreu um erro ao registrar esse usuario");
            const result = await userService.createUser(newUser);
            
            expect(result).toBe("Ocorreu um erro ao registrar esse usuario");
            expect(mockUserRepository.create).toHaveBeenCalledWith(newUser);
            expect(mockUserRepository.create).toHaveBeenCalledTimes(1);

        })



    });

    describe('get', () => {
        it('should get user', async () => {
            const mockUser: IUser = {
                name: "teste2",
                email: "teste2@gmail.com",
                password: "1234",

            };

            const mockUser2: IUser = {
                name: "usuario2",
                email: "usuario2@gmail.com",
                password: "12345"
            };

            await userService.createUser(mockUser);
            await userService.createUser(mockUser2);
            const resultGetUser = await userService.getUserById(2);

            expect(mockUserRepository.findById).toHaveBeenCalledWith(2); 
            expect(mockUserRepository.findById).toHaveBeenCalledTimes(1);
            expect(resultGetUser).toHaveProperty("email", "usuario2@gmail.com");
            expect(resultGetUser).toHaveProperty("name", "usuario2");
        });

        it('should not get user', async () => {
            (mockUserRepository.findById).mockResolvedValueOnce(false);
            const resultGetUser = await userService.getUserById(3);
            expect(mockUserRepository.findById).toHaveBeenCalledWith(3);
            expect(resultGetUser).toBe(false);

        });

    });

    describe('update', () => {
        it('should update user in success', async () => {
            const newUser: IUser = {
                name: "usuario1",
                email: "usuario1@gmail.com",
                password: "1234"
            };

            await userService.createUser(newUser);

            newUser.name = "novousuario1";
            newUser.email = "emailnovo@gmail.com";

            const result = await userService.updateUser(1, newUser);
            
            expect(mockUserRepository.update).toHaveBeenCalledWith(1, newUser);
            expect(mockUserRepository.update).toHaveBeenCalledTimes(1);
            expect(users[0].name).toBe(newUser.name);
            expect(users[0].email).toBe(newUser.email);
            expect(result).toBe(true);
        });

        it('should not update on failure', async () => {
            const newUser: IUser = {
                name: "teste",
                email: "teste@gmail.com",
                password: "123"
            };

            const result = await userService.updateUser(2, newUser);

            expect(mockUserRepository.update).toHaveBeenCalledWith(2, newUser);
            expect(result).toBe(false);

        });

    });

    describe('delete', () => {
        it('should delete by user successs', async () => {
            const newUser: IUser = {
                name: "teste",
                email: "teste@gmail.com",
                password: "123"
            };
            await userService.createUser(newUser);            
            const result = await userService.deleteUser(users[0].id || 1);

            expect(mockUserRepository.delete).toHaveBeenCalledWith(1);
            expect(mockUserRepository.delete).toHaveBeenCalledTimes(1);
            expect(users.findIndex(user => user.email === newUser.email)).toBe(-1);
            expect(result).toBe(true);
        });

        it('should fail to delete user', async () => {
            const result = await userService.deleteUser(2);

            expect(mockUserRepository.delete).toHaveBeenCalledTimes(1);
            expect(mockUserRepository.delete).toHaveBeenCalledWith(2);
            expect(result).toBe(false);
        });

    });

});
