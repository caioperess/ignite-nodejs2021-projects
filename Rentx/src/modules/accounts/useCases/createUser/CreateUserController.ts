import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ICreateUserDTO } from '@modules/accounts/dtos/ICreateUserDTO';

import { CreateUserUseCase } from './CreateUserUseCase';

export class CreateUserController {
  async handle(req: Request, res: Response): Promise<Response> {
    const data = req.body as ICreateUserDTO;

    const createUserUseCase = container.resolve(CreateUserUseCase);

    await createUserUseCase.execute(data);

    return res.status(201).send();
  }
}
