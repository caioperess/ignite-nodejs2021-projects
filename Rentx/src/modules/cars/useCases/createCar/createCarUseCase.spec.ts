import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/carsRepositoryInMemory';
import { AppError } from '@shared/errors/AppError';

import { CreateCarUseCase } from './createCarUseCase';

let carsRepositoryInMemory: CarsRepositoryInMemory;
let createCarUseCase: CreateCarUseCase;

describe('Create car', () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);
  });

  it('should be able to create a new car', async () => {
    const car = await createCarUseCase.execute({
      brand: 'test brand',
      category_id: 'test id',
      daily_rate: 580,
      description: 'test desc',
      fine_amount: 580,
      license_plate: 'test plate',
      name: 'test name',
    });

    expect(car).toHaveProperty('id');
  });

  it('should not be able to create a car with an existent plate', async () => {
    await createCarUseCase.execute({
      brand: 'test brand',
      category_id: 'test id',
      daily_rate: 580,
      description: 'test desc',
      fine_amount: 580,
      license_plate: 'test plate',
      name: 'test name',
    });

    await expect(
      createCarUseCase.execute({
        brand: 'test brand',
        category_id: 'test id',
        daily_rate: 580,
        description: 'test desc',
        fine_amount: 580,
        license_plate: 'test plate',
        name: 'test name',
      }),
    ).rejects.toEqual(new AppError('Car already exists!'));
  });

  it('should not be able to create a car with available false by default', async () => {
    const car = await createCarUseCase.execute({
      brand: 'test brand',
      category_id: 'test id',
      daily_rate: 580,
      description: 'test desc',
      fine_amount: 580,
      license_plate: 'test plate',
      name: 'test name',
    });

    expect(car.available).toBe(true);
  });
});
