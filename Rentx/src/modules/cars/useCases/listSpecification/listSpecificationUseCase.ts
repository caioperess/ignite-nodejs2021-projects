import { inject, injectable } from 'tsyringe';

import { Specification } from '@modules/cars/infra/typeorm/entities/Specification';
import { ISpecificationsRepository } from '@modules/cars/repositories/ISpecificationsRepository';

@injectable()
export class ListSpecificationUseCase {
  private specificationRepository: ISpecificationsRepository;

  constructor(
    @inject('SpecificationsRepository')
    specificationRepository: ISpecificationsRepository,
  ) {
    this.specificationRepository = specificationRepository;
  }

  async execute(): Promise<Specification[]> {
    const specifications = await this.specificationRepository.list();

    return specifications;
  }
}
