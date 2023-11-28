import dayjs from 'dayjs';

import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/carsRepositoryInMemory';
import { RentalsRepositoryInMemory } from '@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory';
import { DayJsDateProvider } from '@shared/container/providers/DateProvider/implementations/dayJsDateProvider';
import { AppError } from '@shared/errors/AppError';

import { CreateRentalUseCase } from './createRentalUseCase';

let createRentalUseCase: CreateRentalUseCase;
let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
let carsRepositoryInMemory: CarsRepositoryInMemory;
let dayJsDateProvider: DayJsDateProvider;

const DatePlusOneDay = dayjs().add(1, 'day').toDate();

describe('Create Rental', () => {
  beforeEach(() => {
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    dayJsDateProvider = new DayJsDateProvider();
    createRentalUseCase = new CreateRentalUseCase(
      rentalsRepositoryInMemory,
      dayJsDateProvider,
      carsRepositoryInMemory,
    );
  });

  it('should be able to create a new rental', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'car test',
      description: 'desc test',
      daily_rate: 100,
      license_plate: 'test',
      brand: 'brand test',
      fine_amount: 40,
      category_id: '1234',
    });

    const rental = await createRentalUseCase.execute({
      car_id: car.id,
      user_id: '12345',
      expected_return_date: DatePlusOneDay,
    });

    expect(rental).toHaveProperty('id');
    expect(rental).toHaveProperty('start_date');
  });

  it('should not be able to create a new rental with a car that is already in use', async () => {
    await rentalsRepositoryInMemory.create({
      car_id: '1212',
      expected_return_date: DatePlusOneDay,
      user_id: '12345',
    });

    await expect(
      createRentalUseCase.execute({
        car_id: '1212',
        user_id: '14785',
        expected_return_date: DatePlusOneDay,
      }),
    ).rejects.toEqual(new AppError('Car already in use!'));
  });

  it('should not be able to create a new rental for a user that already has a rental in progress', async () => {
    await rentalsRepositoryInMemory.create({
      car_id: 'test',
      expected_return_date: DatePlusOneDay,
      user_id: '12345',
    });

    await expect(
      createRentalUseCase.execute({
        car_id: '34521',
        user_id: '12345',
        expected_return_date: DatePlusOneDay,
      }),
    ).rejects.toEqual(new AppError('User already has a rental in progress!'));
  });

  it('should not be able to create a new rental with less than 24 hours', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'car test',
      description: 'desc test',
      daily_rate: 100,
      license_plate: 'test',
      brand: 'brand test',
      fine_amount: 40,
      category_id: '1234',
    });

    await expect(
      createRentalUseCase.execute({
        car_id: car.id,
        user_id: '12345',
        expected_return_date: new Date(),
      }),
    ).rejects.toEqual(new AppError('Rental must have at least 24 hours!'));
  });
});
