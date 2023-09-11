import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  isAdmin: boolean;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  driver_license: string;

  @CreateDateColumn()
  created_at: Date;
}
