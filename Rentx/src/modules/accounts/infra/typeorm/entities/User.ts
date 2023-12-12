import { Expose } from 'class-transformer';
import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  avatar: string;

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

  @Expose({ name: 'avatar_url' })
  avatar_url(): string {
    switch (process.env.STORAGE) {
      case 'disk':
        return `http://localhost:${process.env.APP_PORT}/avatar/${this.avatar}`;
      case 'S3':
        return `${process.env.AWS_BUCKET_URL}/avatar/${this.avatar}`;
      default:
        return null;
    }
  }
}
