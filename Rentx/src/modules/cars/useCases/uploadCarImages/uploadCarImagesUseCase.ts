import { inject, injectable } from 'tsyringe';

import { ICarsImagesRepository } from '@modules/cars/repositories/ICarsImagesRepository';

interface IRequest {
  car_id: string;
  images_name: string[];
}

@injectable()
export class UploadCarImageUseCase {
  private carsImagesRepository: ICarsImagesRepository;

  constructor(
    @inject('CarsImagesRepository')
    carsImagesRepository: ICarsImagesRepository,
  ) {
    this.carsImagesRepository = carsImagesRepository;
  }

  async execute({ car_id, images_name }: IRequest): Promise<void> {
    images_name.map(async (image) => {
      await this.carsImagesRepository.create(car_id, image);
    });
  }
}
