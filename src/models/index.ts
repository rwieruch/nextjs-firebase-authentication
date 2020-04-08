import 'reflect-metadata';
import { createConnection, getConnection } from 'typeorm';

import * as CourseEntities from './course';
import * as PartnerEntities from './partner';
import * as CouponEntities from './coupon';

export default async function() {
  let connection;

  try {
    connection = await getConnection();

    if (connection.isConnected) {
      await connection.close();
    }
  } catch (error) {
    console.log(error);
  }

  try {
    connection = await createConnection({
      type: process.env.DATABASE_TYPE as any,
      host: process.env.DATABASE_HOST as any,
      port: process.env.DATABASE_PORT as any,
      username: process.env.DATABASE_USERNAME as any,
      password: process.env.DATABASE_PASSWORD as any,
      database: process.env.DATABASE_NAME as any,
      entities: [
        ...Object.values(CourseEntities),
        ...Object.values(PartnerEntities),
        ...Object.values(CouponEntities),
      ],
      synchronize: true,
      logging: false,
      ...(process.env.NODE_ENV === 'production' && {
        ssl: {
          ca: process.env.DATABASE_SSL_CERTIFICATE,
        },
      }),
    });
  } catch (error) {
    console.log(error);
  }

  return connection;
}
