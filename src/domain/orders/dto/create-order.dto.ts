import { IsEnum, IsOptional } from 'class-validator';
import { OrderStatus } from 'orders/enums/order-status.enum';

export class CreateOrderDto {
  @IsOptional()
  @IsEnum(OrderStatus)
  status: OrderStatus;
}
