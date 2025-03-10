import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '14032001',
      database: 'postgres',
      autoLoadEntities: true,
    }),
  ],
})
export class DatabaseModule {}
