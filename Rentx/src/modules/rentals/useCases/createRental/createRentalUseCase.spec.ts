import dayjs from 'dayjs';

import { RentalsRepositoryInMemory } from '@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory';
import { DayJsDateProvider } from '@shared/container/providers/implementations/dayJsDateProvider';
import { AppError } from '@shared/errors/AppError';

import { CreateRentalUseCase } from './createRentalUseCase';

let createRentalUseCase: CreateRentalUseCase;
let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
let dayJsDateProvider: DayJsDateProvider;

const DatePlusOneDay = dayjs().add(1, 'day').toDate();

describe('Create Rental', () => {
  beforeEach(() => {
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
    dayJsDateProvider = new DayJsDateProvider();
    createRentalUseCase = new CreateRentalUseCase(
      rentalsRepositoryInMemory,
      dayJsDateProvider,
    );
  });

  it('should be able to create a new rental', async () => {
    const rental = await createRentalUseCase.execute({
      car_id: '1212',
      user_id: '12345',
      expected_return_date: DatePlusOneDay,
    });

    expect(rental).toHaveProperty('id');
    expect(rental).toHaveProperty('start_date');
  });

  it('should not be able to create a new rental with a car that is already in use', async () => {
    await createRentalUseCase.execute({
      car_id: '1212',
      user_id: '12345',
      expected_return_date: DatePlusOneDay,
    });

    expect(async () => {
      await createRentalUseCase.execute({
        car_id: '1212',
        user_id: '14785',
        expected_return_date: DatePlusOneDay,
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a new rental for a user that already has a rental in progress', async () => {
    await createRentalUseCase.execute({
      car_id: '1212',
      user_id: '12345',
      expected_return_date: DatePlusOneDay,
    });

    expect(async () => {
      await createRentalUseCase.execute({
        car_id: '34521',
        user_id: '12345',
        expected_return_date: DatePlusOneDay,
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a new rental with less than 24 hours', async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        car_id: '34521',
        user_id: '12345',
        expected_return_date: new Date(),
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
