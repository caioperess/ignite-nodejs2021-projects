import { Request, Response } from 'express';

import { ListCategoriesUseCase } from './listCategoriesUseCase';

export class ListCategoriesController {
  private listCategoriesUseCase: ListCategoriesUseCase;

  constructor(listCategoriesUseCase: ListCategoriesUseCase) {
    this.listCategoriesUseCase = listCategoriesUseCase;
  }

  handle(req: Request, res: Response): Response {
    const categories = this.listCategoriesUseCase.execute();

    return res.json(categories);
  }
}
