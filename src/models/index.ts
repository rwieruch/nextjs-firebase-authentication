// https://github.com/typeorm/typeorm/issues/5676#issuecomment-797925238
// https://github.com/typeorm/typeorm/issues/6241#issuecomment-643690383

import { Connection, getConnectionManager } from 'typeorm';

import * as CourseEntities from './course';
import * as PartnerEntities from './partner';
import * as CouponEntities from './coupon';

const options: { [key: string]: any } = {
  default: {
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
  },
};

function entitiesChanged(
  prevEntities: any[],
  newEntities: any[]
): boolean {
  if (prevEntities.length !== newEntities.length) return true;

  for (let i = 0; i < prevEntities.length; i++) {
    if (prevEntities[i] !== newEntities[i]) return true;
  }

  return false;
}

async function updateConnectionEntities(
  connection: Connection,
  entities: any[]
) {
  // @ts-ignore
  if (!entitiesChanged(connection.options.entities, entities)) return;

  // @ts-ignore
  connection.options.entities = entities;

  // @ts-ignore
  connection.buildMetadatas();

  if (connection.options.synchronize) {
    await connection.synchronize();
  }
}

export default async function(
  name: string = 'default'
): Promise<Connection> {
  const connectionManager = getConnectionManager();

  if (connectionManager.has(name)) {
    const connection = connectionManager.get(name);

    if (!connection.isConnected) {
      await connection.connect();
    }

    if (process.env.NODE_ENV !== 'production') {
      await updateConnectionEntities(
        connection,
        options[name].entities
      );
    }

    return connection;
  }

  return await connectionManager
    .create({ name, ...options[name] })
    .connect();
}
