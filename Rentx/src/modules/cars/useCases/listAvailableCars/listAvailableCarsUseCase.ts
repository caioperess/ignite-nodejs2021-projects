import { inject, injectable } from 'tsyringe';

import { Car } from '@modules/cars/infra/typeorm/entities/Car';
import {
  ICarsRepository,
  IListAvailableRequest,
} from '@modules/cars/repositories/ICarsRepository';

@injectable()
export class ListAvailableCarsUseCase {
  private carsRepository: ICarsRepository;

  constructor(
    @inject('CarsRepository')
    carsRepository: ICarsRepository,
  ) {
    this.carsRepository = carsRepository;
  }

  async execute(data: IListAvailableRequest): Promise<Car[]> {
    return await this.carsRepository.listAvailable(data);
  }
}
