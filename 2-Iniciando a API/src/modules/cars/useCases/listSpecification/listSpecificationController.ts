import { Request, Response } from 'express';

import { ListSpecificationUseCase } from './listSpecificationUseCase';

export class ListSpecificationController {
  private listSpecificationUseCase: ListSpecificationUseCase;

  constructor(listSpecificationUseCase: ListSpecificationUseCase) {
    this.listSpecificationUseCase = listSpecificationUseCase;
  }

  handle(req: Request, res: Response): Response {
    const specifications = this.listSpecificationUseCase.execute();

    return res.json(specifications);
  }
}
