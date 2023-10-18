import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'database_ignite',
  port: 5432,
  username: 'docker',
  password: 'docker',
  database: 'rentx',
  migrations: ['./src/shared/infra/typeorm/migrations/*.ts'],
  entities: ['./src/modules/**/entities/*.ts'],
});

export async function ConnectDB() {
  try {
    await AppDataSource.initialize();
    console.log('Database initialized');
  } catch (err) {
    console.error('Database connection error', err);
  }
}
