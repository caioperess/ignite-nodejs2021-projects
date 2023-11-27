import { inject, injectable } from 'tsyringe';

import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';
import { ICreateRentalDTO } from '@modules/rentals/dtos/ICreateRentalDTO';
import { Rental } from '@modules/rentals/infra/typeorm/entities/Rental';
import { IRentalsRepository } from '@modules/rentals/repositories/IRentalsRepository';
import { IDateProvider } from '@shared/container/providers/DateProvider/IDateProvider';
import { AppError } from '@shared/errors/AppError';

@injectable()
export class CreateRentalUseCase {
  private rentalsRepository: IRentalsRepository;
  private dateProvider: IDateProvider;
  private carsRepository: ICarsRepository;

  constructor(
    @inject('RentalsRepository')
    rentalsRepository: IRentalsRepository,
    @inject('DateProvider')
    dateProvider: IDateProvider,
    @inject('CarsRepository')
    carsRepository: ICarsRepository,
  ) {
    this.rentalsRepository = rentalsRepository;
    this.dateProvider = dateProvider;
    this.carsRepository = carsRepository;
  }

  async execute(data: ICreateRentalDTO): Promise<Rental> {
    const minHoursToCreateRental = 24;

    const carAlreadyInUse = await this.rentalsRepository.findOpenRentalByCarId(
      data.car_id,
    );

    if (carAlreadyInUse) {
      throw new AppError('Car already in use!');
    }

    const userAlreadyHasRental =
      await this.rentalsRepository.findOpenRentalByUserId(data.user_id);

    if (userAlreadyHasRental) {
      throw new AppError('User already has a rental in progress!');
    }

    const compare = this.dateProvider.compareInHours(
      this.dateProvider.dateNow(),
      data.expected_return_date,
    );

    if (compare < minHoursToCreateRental) {
      throw new AppError('Rental must have at least 24 hours!');
    }

    const rental = await this.rentalsRepository.create(data);

    await this.carsRepository.updateAvailability(data.car_id, false);

    return rental;
  }
}
