import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './domain/users/users.module';
import { CommonModule } from './common/common.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [UsersModule, CommonModule, DatabaseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
