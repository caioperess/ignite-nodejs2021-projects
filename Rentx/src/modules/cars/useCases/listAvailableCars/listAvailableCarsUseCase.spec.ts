import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/carsRepositoryInMemory';

import { ListAvailableCarsUseCase } from './listAvailableCarsUseCase';

let listCarsUseCase: ListAvailableCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe('List cars', () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    listCarsUseCase = new ListAvailableCarsUseCase(carsRepositoryInMemory);
  });

  it('should be able to list all available cars', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'Test car',
      description: 'Test desc',
      daily_rate: 580,
      license_plate: 'ABCD-4123',
      fine_amount: 280,
      brand: 'TEST',
      category_id: '123',
    });

    const cars = await listCarsUseCase.execute({});

    expect(cars).toEqual([car]);
  });

  it('should be able to list all available cars by brand', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'Test car',
      description: 'Test desc',
      daily_rate: 580,
      license_plate: 'ABCD-4123',
      fine_amount: 280,
      brand: 'Car_brand',
      category_id: '123',
    });

    const cars = await listCarsUseCase.execute({
      brand: 'Car_brand',
    });

    expect(cars).toEqual([car]);
  });

  it('should be able to list all available cars by name', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'Test car 2',
      description: 'Test desc',
      daily_rate: 580,
      license_plate: 'ABCD-4123',
      fine_amount: 280,
      brand: 'Car_brand',
      category_id: '123',
    });

    const cars = await listCarsUseCase.execute({
      name: 'Test car 2',
    });

    expect(cars).toEqual([car]);
  });

  it('should be able to list all available cars by category', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'Test car',
      description: 'Test desc',
      daily_rate: 580,
      license_plate: 'ABCD-4123',
      fine_amount: 280,
      brand: 'Car_brand',
      category_id: '1234',
    });

    const cars = await listCarsUseCase.execute({
      category_id: '1234',
    });

    expect(cars).toEqual([car]);
  });
});
