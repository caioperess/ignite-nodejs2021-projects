import { In, Repository } from 'typeorm';

import { ICreateSpecificationDTO } from '@modules/cars/dtos/ICreateSpecificationDTO';
import { ISpecificationsRepository } from '@modules/cars/repositories/ISpecificationsRepository';
import { AppDataSource } from '@shared/infra/typeorm';

import { Specification } from '../entities/Specification';

export class SpecificationsRepository implements ISpecificationsRepository {
  private repository: Repository<Specification>;

  constructor() {
    this.repository = AppDataSource.getRepository(Specification);
  }

  async findByIds(ids: string[]): Promise<Specification[]> {
    return await this.repository.find({
      where: {
        id: In(ids),
      },
    });
  }

  async create({
    name,
    description,
  }: ICreateSpecificationDTO): Promise<Specification> {
    const specification = this.repository.create({
      name,
      description,
    });

    await this.repository.save(specification);

    return specification;
  }

  async findByName(name: string): Promise<Specification> {
    const specification = await this.repository.findOne({
      where: { name },
    });

    return specification;
  }

  async list(): Promise<Specification[]> {
    const specifications = await this.repository.find();

    return specifications;
  }
}
