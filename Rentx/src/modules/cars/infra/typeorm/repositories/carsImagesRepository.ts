import { Repository } from 'typeorm';

import { ICarsImagesRepository } from '@modules/cars/repositories/ICarsImagesRepository';
import { AppDataSource } from '@shared/infra/typeorm';

import { CarImage } from '../entities/CarImage';

export class CarsImagesRepository implements ICarsImagesRepository {
  private repository: Repository<CarImage>;

  constructor() {
    this.repository = AppDataSource.getRepository(CarImage);
  }

  async create(car_id: string, image_name: string): Promise<CarImage> {
    const car_image = this.repository.create({ car_id, image_name });

    await this.repository.save(car_image);

    return car_image;
  }
}
