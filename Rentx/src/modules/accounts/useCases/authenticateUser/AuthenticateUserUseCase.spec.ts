import { ICreateUserDTO } from '@modules/accounts/dtos/ICreateUserDTO';
import { UsersRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UsersRepositoryInMemory';
import { AppError } from '@shared/errors/AppError';

import { CreateUserUseCase } from '../createUser/CreateUserUseCase';
import { AuthenticateUserUseCase } from './AuthenticateUserUseCase';

let authenticateUserUseCase: AuthenticateUserUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;

describe('Authenticate User', () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    authenticateUserUseCase = new AuthenticateUserUseCase(
      usersRepositoryInMemory,
    );
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
  });

  it('should be able to authenticate an user with email and password', async () => {
    const user: ICreateUserDTO = {
      driver_license: '000123',
      email: 'user@email.com',
      name: 'User test',
      password: '123456',
    };

    await createUserUseCase.execute(user);

    const result = await authenticateUserUseCase.execute({
      email: user.email,
      password: user.password,
    });

    expect(result).toHaveProperty('token');
  });

  it('should not be able to authenticate a non existent user', async () => {
    expect(async () => {
      await authenticateUserUseCase.execute({
        email: 'email test',
        password: 'password test',
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate an user with incorrect password', async () => {
    const user: ICreateUserDTO = {
      driver_license: '000123',
      email: 'user@email.com',
      name: 'User test',
      password: '123456',
    };

    await createUserUseCase.execute(user);

    expect(async () => {
      await authenticateUserUseCase.execute({
        email: user.email,
        password: 'password test',
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
