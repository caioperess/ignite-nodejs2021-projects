import { inject, injectable } from 'tsyringe';

import { Car } from '@modules/cars/infra/typeorm/entities/Car';
import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';
import { ISpecificationsRepository } from '@modules/cars/repositories/ISpecificationsRepository';
import { AppError } from '@shared/errors/AppError';

interface IRequest {
  car_id: string;
  specifications_id: string[];
}

@injectable()
export class CreateCarSpecificationUseCase {
  private carsRepository: ICarsRepository;
  private specificationsRepository: ISpecificationsRepository;

  constructor(
    @inject('CarsRepository')
    carsRepository: ICarsRepository,
    @inject('SpecificationsRepository')
    specificationsRepository: ISpecificationsRepository,
  ) {
    this.carsRepository = carsRepository;
    this.specificationsRepository = specificationsRepository;
  }

  async execute({ car_id, specifications_id }: IRequest): Promise<Car> {
    const carExists = await this.carsRepository.findById(car_id);

    if (!carExists) {
      throw new AppError('Car not found!', 404);
    }

    const specifications = await this.specificationsRepository.findByIds(
      specifications_id,
    );

    carExists.specifications = specifications;

    await this.carsRepository.create(carExists);

    return carExists;
  }
}
