import { ICreateUserDTO } from '@modules/accounts/dtos/ICreateUserDTO';
import { UsersRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UsersRepositoryInMemory';
import { AppError } from '@shared/errors/AppError';

import { CreateUserUseCase } from './CreateUserUseCase';

let usersRepositoryInMemory: UsersRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;

describe('Create user', () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();

    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
  });

  it('should be able to create a new user', async () => {
    const user: ICreateUserDTO = {
      driver_license: '516498',
      email: 'verica@fuplulep.mo',
      name: 'Bryan',
      password: 'w6piw',
    };

    await createUserUseCase.execute(user);
  });

  it('should not be able to create a duplicated user', async () => {
    const user: ICreateUserDTO = {
      driver_license: '516498',
      email: 'verica@fuplulep.mo',
      name: 'Bryan',
      password: 'w6piw',
    };

    await createUserUseCase.execute(user);

    await expect(createUserUseCase.execute(user)).rejects.toEqual(
      new AppError('User already exists!'),
    );
  });
});
