import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateRentalUseCase } from './createRentalUseCase';

export class CreateRentalController {
  async handle(req: Request, res: Response): Promise<Response> {
    const user_id = req.user.id;
    const { car_id, expected_return_date } = req.body;

    const createRentalUseCase = container.resolve(CreateRentalUseCase);

    const rental = await createRentalUseCase.execute({
      car_id,
      expected_return_date,
      user_id,
    });

    return res.status(201).json(rental);
  }
}
