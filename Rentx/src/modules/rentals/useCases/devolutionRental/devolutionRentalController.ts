import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { DevolutionRentalUseCase } from './devolutionRentalUseCase';

export class DevolutionRentalController {
  async handle(req: Request, res: Response): Promise<Response> {
    const user_id = req.user.id;
    const { id } = req.params;

    const devolutionRentalUseCase = container.resolve(DevolutionRentalUseCase);

    const rental = await devolutionRentalUseCase.execute({ id, user_id });

    return res.status(200).json(rental);
  }
}
