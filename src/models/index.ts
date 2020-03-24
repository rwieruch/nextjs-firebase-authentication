import 'reflect-metadata';
import { createConnection, getConnection } from 'typeorm';

import { Course } from './course';

export default async function() {
  let connection;

  try {
    connection = await getConnection();

    if (connection.isConnected) {
      await connection.close();
    }
  } catch (error) {}

  try {
    connection = await createConnection({
      type: process.env.DATABASE_TYPE as any,
      host: process.env.DATABASE_HOST as any,
      port: process.env.DATABASE_PORT as any,
      username: process.env.DATABASE_USERNAME as any,
      password: process.env.DATABASE_PASSWORD as any,
      database: process.env.DATABASE_NAME as any,
      entities: [Course],
      synchronize: true,
      logging: false,
    });
  } catch (error) {
    console.log(error);
  }

  return connection;
}
