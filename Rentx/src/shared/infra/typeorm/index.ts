import { DataSource } from 'typeorm';

export let AppDataSource: DataSource;

function createDataSource(host: string) {
  AppDataSource = new DataSource({
    type: 'postgres',
    host,
    port: 5432,
    username: 'docker',
    password: 'docker',
    database: 'rentx',
    migrations: ['./src/shared/infra/typeorm/migrations/*.ts'],
    entities: ['./src/modules/**/entities/*.ts'],
  });
}

export async function ConnectDB(host = 'localhost') {
  try {
    createDataSource(host);
    await AppDataSource.initialize();
    console.log('Database initialized');
  } catch (err) {
    console.error('Database connection error', err);
  }
}
