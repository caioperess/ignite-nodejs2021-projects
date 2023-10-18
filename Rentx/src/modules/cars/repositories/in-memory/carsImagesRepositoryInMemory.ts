import { v4 as uuidV4 } from 'uuid';

import { CarImage } from '@modules/cars/infra/typeorm/entities/CarImage';

import { ICarsImagesRepository } from '../ICarsImagesRepository';

export class CarsImagesRepositoryInMemory implements ICarsImagesRepository {
  private carsImages: CarImage[] = [];

  async create(car_id: string, image_name: string): Promise<CarImage> {
    const carImage = new CarImage();

    Object.assign(carImage, {
      id: uuidV4(),
      image_name,
      car_id,
      created_at: new Date(),
    });

    this.carsImages.push(carImage);

    return carImage;
  }
}
