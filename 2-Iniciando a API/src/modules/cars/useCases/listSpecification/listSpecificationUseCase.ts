import { Specification } from '../../model/Specification';
import { ISpecificationsRepository } from '../../repositories/ISpecificationsRepository';

export class ListSpecificationUseCase {
  private specificationRepository: ISpecificationsRepository;

  constructor(specificationRepository: ISpecificationsRepository) {
    this.specificationRepository = specificationRepository;
  }

  execute(): Specification[] {
    const specifications = this.specificationRepository.list();

    return specifications;
  }
}
