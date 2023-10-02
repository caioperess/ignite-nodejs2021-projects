import { inject, injectable } from 'tsyringe';

import { ISpecificationsRepository } from '@modules/cars/repositories/ISpecificationsRepository';
import { AppError } from '@shared/errors/AppError';

interface IRequest {
  name: string;
  description: string;
}

@injectable()
export class CreateSpecificationUseCase {
  private specificationRepository: ISpecificationsRepository;

  constructor(
    @inject('SpecificationsRepository')
    specificationRepository: ISpecificationsRepository,
  ) {
    this.specificationRepository = specificationRepository;
  }

  async execute({ name, description }: IRequest) {
    const specificationAlreadyExists =
      await this.specificationRepository.findByName(name);

    if (specificationAlreadyExists) {
      throw new AppError('Category already exists!');
    }

    await this.specificationRepository.create({ name, description });
  }
}
