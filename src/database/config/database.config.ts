import { registerAs } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export default registerAs('database', () => {
  const config = {
    type: 'postgres',
    username: process.env.DATABASE_USER!,
    password: process.env.DATABASE_PASSWORD!,
    database: process.env.DATABASE_NAME!,
    host: process.env.DATABASE_HOSTDATABASE_HOST!,
    port: +process.env.DATABASE_PORT!,
    autoLoadEntities: true,
  } as const satisfies TypeOrmModuleOptions;

  return config;
});
