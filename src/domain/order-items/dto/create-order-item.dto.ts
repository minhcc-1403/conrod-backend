import { IsOptional } from 'class-validator';
import { Order } from 'orders/entities/order.entity';

export class CreateOrderItemDto {
  @IsOptional()
  order: Order;
}
