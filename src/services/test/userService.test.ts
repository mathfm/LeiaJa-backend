import { expect, it, vi, describe } from 'vitest'
import { UserService } from '../UserService.js';
import { UserRepository } from '../../repositories/UserRepository.js';
import { IUser } from '../../interfaces/IUser.js';


const mockUserRepository: UserRepository = {
    create: vi.fn(),
    update: function (id: number, user: IUser): Promise<boolean> {
        throw new Error('Function not implemented.');
    },
    delete: function (id: number): Promise<boolean> {
        throw new Error('Function not implemented.');
    },
    findById: function (id: number): Promise<false | IUser> {
        throw new Error('Function not implemented.');
    }
};

const userService = new UserService(mockUserRepository as unknown as UserRepository)

describe('#User Suite', () => {
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
            expect(mockUserRepository.create).toHaveBeenCalledTimes(1);

        });
    });
});
