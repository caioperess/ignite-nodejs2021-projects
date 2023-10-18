import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';

import { Car } from './Car';

@Entity('cars_image')
export class CarImage {
  @PrimaryColumn('uuid')
  id: string;

  @Column()
  image_name: string;

  @Column()
  car_id: string;

  @ManyToOne(() => Car)
  @JoinColumn({ name: 'car_id' })
  car: Car;

  @CreateDateColumn()
  created_at: Date;
}
