import { Repository } from 'typeorm';

import { ICreateCarDTO } from '@modules/cars/dtos/ICreateCarDTO';
import {
  ICarsRepository,
  IListAvailableRequest,
} from '@modules/cars/repositories/ICarsRepository';
import { AppDataSource } from '@shared/infra/typeorm';

import { Car } from '../entities/Car';

export class CarsRepository implements ICarsRepository {
  private repository: Repository<Car>;

  constructor() {
    this.repository = AppDataSource.getRepository(Car);
  }

  async findById(id: string): Promise<Car> {
    return this.repository.findOne({ where: { id } });
  }

  async findByLicensePlate(license_plate: string): Promise<Car> {
    return await this.repository.findOne({ where: { license_plate } });
  }

  async list(): Promise<Car[]> {
    return await this.repository.find();
  }

  async listAvailable({
    brand,
    category_id,
    name,
  }: IListAvailableRequest): Promise<Car[]> {
    const carsQuery = this.repository
      .createQueryBuilder('c')
      .where('available = :available', { available: true });

    if (brand) {
      carsQuery.andWhere('c.brand = :brand', { brand });
    }

    if (category_id) {
      carsQuery.andWhere('c.category_id = :category_id', { category_id });
    }

    if (name) {
      carsQuery.andWhere('c.name = :name', { name });
    }

    const cars = await carsQuery.getMany();

    return cars;
  }

  async create(data: ICreateCarDTO): Promise<Car> {
    const car = this.repository.create(data);

    await this.repository.save(car);

    return car;
  }
}
