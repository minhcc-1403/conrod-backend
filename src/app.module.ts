import { Module } from '@nestjs/common';
import { PaymentsModule } from 'payments/payments.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CommonModule } from './common/common.module';
import { DatabaseModule } from './database/database.module';
import { OrdersModule } from './domain/orders/orders.module';
import { UsersModule } from './domain/users/users.module';
import { EnvModule } from './env/env.module';

@Module({
  imports: [
    UsersModule,
    CommonModule,
    DatabaseModule,
    EnvModule,
    OrdersModule,
    PaymentsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
