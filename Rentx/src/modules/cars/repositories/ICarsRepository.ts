import { ICreateCarDTO } from '../dtos/ICreateCarDTO';
import { Car } from '../infra/typeorm/entities/Car';

export interface IListAvailableRequest {
  name?: string;
  category_id?: string;
  brand?: string;
}

export interface ICarsRepository {
  findByLicensePlate(license_plate: string): Promise<Car>;
  findById(id): Promise<Car>;
  create(data: ICreateCarDTO): Promise<Car>;
  listAvailable(data: IListAvailableRequest): Promise<Car[]>;
  list(): Promise<Car[]>;
  updateAvailability(id: string, available: boolean): Promise<void>;
}
