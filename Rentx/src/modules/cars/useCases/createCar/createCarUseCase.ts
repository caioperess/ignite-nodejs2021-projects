import { inject, injectable } from 'tsyringe';

import { ICreateCarDTO } from '@modules/cars/dtos/ICreateCarDTO';
import { Car } from '@modules/cars/infra/typeorm/entities/Car';
import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';
import { AppError } from '@shared/errors/AppError';

@injectable()
export class CreateCarUseCase {
  private carsRepository: ICarsRepository;

  constructor(
    @inject('CarsRepository')
    carsRepository: ICarsRepository,
  ) {
    this.carsRepository = carsRepository;
  }

  async execute(data: ICreateCarDTO): Promise<Car> {
    const carAlreadyExists = await this.carsRepository.findByLicensePlate(
      data.license_plate,
    );

    if (carAlreadyExists) {
      throw new AppError('Car already exists!');
    }

    return await this.carsRepository.create(data);
  }
}
