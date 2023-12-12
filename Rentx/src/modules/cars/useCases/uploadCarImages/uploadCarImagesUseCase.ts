import { inject, injectable } from 'tsyringe';

import { ICarsImagesRepository } from '@modules/cars/repositories/ICarsImagesRepository';
import { IStorageProvider } from '@shared/container/providers/StorageProvider/IStorageProvider';

interface IRequest {
  car_id: string;
  images_name: string[];
}

@injectable()
export class UploadCarImageUseCase {
  private carsImagesRepository: ICarsImagesRepository;
  private storageProvider: IStorageProvider;

  constructor(
    @inject('CarsImagesRepository')
    carsImagesRepository: ICarsImagesRepository,
    @inject('StorageProvider')
    storageProvider: IStorageProvider,
  ) {
    this.carsImagesRepository = carsImagesRepository;
    this.storageProvider = storageProvider;
  }

  async execute({ car_id, images_name }: IRequest): Promise<void> {
    images_name.map(async (image) => {
      await this.carsImagesRepository.create(car_id, image);
      await this.storageProvider.save(image, 'cars');
    });
  }
}
