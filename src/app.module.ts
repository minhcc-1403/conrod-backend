import { Module } from '@nestjs/common';
import { CategoryModule } from 'categories/category.module';
import { OrderItemsModule } from 'order-items/order-items.module';
import { PaymentsModule } from 'payments/payments.module';
import { ProductsModule } from 'products/products.module';
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
    ProductsModule,
    OrderItemsModule,
    CategoryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
