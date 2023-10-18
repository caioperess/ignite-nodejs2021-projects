import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateCarSpecificationUseCase } from './createCarSpecificationUseCase';

export class CreateCarSpecificationController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { specifications_id } = req.body;

    const createCarSpecificationsUseCase = container.resolve(
      CreateCarSpecificationUseCase,
    );

    const car = await createCarSpecificationsUseCase.execute({
      car_id: id,
      specifications_id,
    });

    return res.status(201).json(car);
  }
}
