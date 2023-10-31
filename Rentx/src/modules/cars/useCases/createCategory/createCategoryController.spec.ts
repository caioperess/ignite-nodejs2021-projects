import '@shared/container';
import { hash } from 'bcrypt';
import request from 'supertest';
import { v4 as uuidV4 } from 'uuid';

import app from '@shared/infra/http/app';
import { AppDataSource } from '@shared/infra/typeorm';

describe('Create category controller', () => {
  beforeEach(async () => {
    await AppDataSource.initialize();
    await AppDataSource.runMigrations();

    const id = uuidV4();
    const hashedPassword = await hash('admin', 8);

    await AppDataSource.query(
      `INSERT INTO USERS(id,name,email,password,driver_license,"isAdmin",created_at) 
    values('${id}','admin','admin@email.com','${hashedPassword}','123456789',true,'now()')`,
    );
  });

  afterEach(async () => {
    await AppDataSource.dropDatabase();
    await AppDataSource.destroy();
  });

  it('should be able to create a new category', async () => {
    const responseToken = await request(app).post('/sessions').send({
      email: 'admin@email.com',
      password: 'admin',
    });

    const { token } = responseToken.body;

    const response = await request(app)
      .post('/categories')
      .send({
        name: 'Category supertest',
        description: 'Description supertest',
      })
      .set({
        Authorization: `Bearer ${token}`,
      });

    expect(response.status).toBe(201);
  });
});
