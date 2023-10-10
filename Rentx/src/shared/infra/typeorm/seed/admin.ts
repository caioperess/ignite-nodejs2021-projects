import { hash } from 'bcrypt';

import { AppDataSource, ConnectDB } from '..';

import { v4 as uuidV4 } from 'uuid';

async function create() {
  await ConnectDB();

  const id = uuidV4();

  const hashedPassword = await hash('admin', 8);

  AppDataSource.query(
    `INSERT INTO USERS(id,name,email,password,driver_license,"isAdmin",created_at) 
    values('${id}','admin','admin@email.com','${hashedPassword}','123456789',true,'now()')`,
  );

  await AppDataSource.destroy();
}

create().then(() => console.log('Admin seed completed'));
