import * as dotenv from 'dotenv';
import * as dotenvExpand from 'dotenv-expand';
import { DataSource } from 'typeorm';

dotenvExpand.expand(dotenv.config());

export default new DataSource({
  type: 'postgres',
  url: process.env.DATABASE_URL,
  // host: 'localhost',
  // port: 5432,
  // username: 'postgres',
  // password: '14032001',
  // database: 'postgres',
  synchronize: false,
  entities: ['dist/domain/**/*.entity.js'],
  migrations: ['dist/database/migrations/*.js'],
});
