import { v4 as uuidV4 } from 'uuid';

import { ICreateRentalDTO } from '@modules/rentals/dtos/ICreateRentalDTO';
import { Rental } from '@modules/rentals/infra/typeorm/entities/Rental';

import { IRentalsRepository } from '../IRentalsRepository';

export class RentalsRepositoryInMemory implements IRentalsRepository {
  private rentals: Rental[] = [];

  async create({
    car_id,
    expected_return_date,
    user_id,
  }: ICreateRentalDTO): Promise<Rental> {
    const rental = new Rental();

    Object.assign(rental, {
      id: uuidV4(),
      car_id,
      expected_return_date,
      user_id,
      start_date: new Date(),
      end_date: null,
      total: 0,
      created_at: new Date(),
      updated_at: new Date(),
    });

    this.rentals.push(rental);

    return rental;
  }

  async findOpenRentalByCarId(car_id: string): Promise<Rental> {
    return this.rentals.find(
      (rental) => rental.car_id === car_id && rental.end_date === null,
    );
  }

  async findOpenRentalByUserId(user_id: string): Promise<Rental> {
    return this.rentals.find(
      (rental) => rental.user_id === user_id && rental.end_date === null,
    );
  }

  async findById(id: string): Promise<Rental> {
    const rental = this.rentals.find((rental) => rental.id === id);

    return rental;
  }

  async findByUser(user_id: string): Promise<Rental[]> {
    const rentals = this.rentals.filter((rental) => rental.user_id === user_id);

    return rentals;
  }
}
