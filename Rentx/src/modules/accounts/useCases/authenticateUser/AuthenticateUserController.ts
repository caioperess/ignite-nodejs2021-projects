import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ICreateUserDTO } from '../../dtos/ICreateUserDTO';
import { AuthenticateUserUseCase } from './AuthenticateUserUseCase';

export class AuthenticateUserController {
  async handle(req: Request, res: Response): Promise<Response> {
    const data = req.body as ICreateUserDTO;

    const authenticateUserUseCase = container.resolve(AuthenticateUserUseCase);

    const response = await authenticateUserUseCase.execute(data);

    return res.status(201).json(response);
  }
}
