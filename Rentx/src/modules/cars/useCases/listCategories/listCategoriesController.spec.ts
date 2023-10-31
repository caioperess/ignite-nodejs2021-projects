import { hash } from 'bcrypt';
import request from 'supertest';
import { v4 as uuidV4 } from 'uuid';

import '@shared/container';

import app from '@shared/infra/http/app';
import { AppDataSource } from '@shared/infra/typeorm';

describe('List category controller', () => {
  beforeAll(async () => {
    await AppDataSource.initialize();
    await AppDataSource.runMigrations();

    const id = uuidV4();
    const hashedPassword = await hash('admin', 8);

    await AppDataSource.query(
      `INSERT INTO USERS(id,name,email,password,driver_license,"isAdmin",created_at) 
    values('${id}','admin','admin@email.com','${hashedPassword}','123456789',true,'now()')`,
    );
  });

  afterAll(async () => {
    await AppDataSource.dropDatabase();
    await AppDataSource.destroy();
  });

  it('should be able to list all categories', async () => {
    const responseToken = await request(app).post('/sessions').send({
      email: 'admin@email.com',
      password: 'admin',
    });

    const { token } = responseToken.body;

    await request(app)
      .post('/categories')
      .send({
        name: 'Category Supertest 22',
        description: 'Category Supertest 22',
      })
      .set({
        Authorization: `Bearer ${token}`,
      });

    const response = await request(app).get('/categories');

    expect(response.status).toBe(200);
    expect(response.body.length).toBe(1);
  });
});
