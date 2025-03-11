import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './domain/users/users.module';
import { CommonModule } from './common/common.module';
import { DatabaseModule } from './database/database.module';
import { EnvModule } from './env/env.module';
import { OrdersModule } from './domain/orders/orders.module';

@Module({
  imports: [UsersModule, CommonModule, DatabaseModule, EnvModule, OrdersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
