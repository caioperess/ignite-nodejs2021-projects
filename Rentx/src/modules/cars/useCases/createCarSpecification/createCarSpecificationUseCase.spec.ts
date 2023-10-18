import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/carsRepositoryInMemory';
import { SpecificationsRepositoryInMemory } from '@modules/cars/repositories/in-memory/specificationsRepositoryInMemory';
import { AppError } from '@shared/errors/AppError';

import { CreateCarSpecificationUseCase } from './createCarSpecificationUseCase';

let createCarSpecificationUseCase: CreateCarSpecificationUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;
let specificationsRepositoryInMemory: SpecificationsRepositoryInMemory;

describe('Create Car Specification', () => {
  beforeEach(() => {
    specificationsRepositoryInMemory = new SpecificationsRepositoryInMemory();
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    createCarSpecificationUseCase = new CreateCarSpecificationUseCase(
      carsRepositoryInMemory,
      specificationsRepositoryInMemory,
    );
  });

  it('should be able to add a new specification to a car', async () => {
    const car = await carsRepositoryInMemory.create({
      brand: 'test brand',
      category_id: 'test id',
      daily_rate: 580,
      description: 'test desc',
      fine_amount: 580,
      license_plate: 'test plate',
      name: 'test name',
    });

    const specification = await specificationsRepositoryInMemory.create({
      name: 'test name',
      description: 'test desc',
    });

    const specifications_id = [specification.id];

    const specificationsCar = await createCarSpecificationUseCase.execute({
      car_id: car.id,
      specifications_id,
    });

    expect(specificationsCar).toHaveProperty('specifications');
    expect(specificationsCar.specifications.length).toBe(1);
  });

  it('should not be able to add a new specification to an inexistent car', async () => {
    const car_id = '123';
    const specifications_id = ['1874'];

    expect(async () => {
      await createCarSpecificationUseCase.execute({
        car_id,
        specifications_id,
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
