import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { IdDto } from 'common/dto/id.dto';
import { PaginationDto } from 'common/dto/pagination.dto';
import { CreateOrderItemDto } from 'order-items/dto/create-order-item.dto';
import { UpdateOrderItemDto } from 'order-items/dto/update-order-item.dto';
import { OrderItemsService } from './order-items.service';

@Controller('order-items')
export class OrderItemsController {
  constructor(private readonly orderItemsService: OrderItemsService) {}

  @Post()
  create(@Body() createOrderItemDto: CreateOrderItemDto) {
    return this.orderItemsService.create(createOrderItemDto);
  }

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.orderItemsService.findAll(paginationDto);
  }

  @Get(':id')
  findOne(@Param() { id }: IdDto) {
    return this.orderItemsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param() { id }: IdDto,
    @Body() updateOrderItemDto: UpdateOrderItemDto,
  ) {
    return this.orderItemsService.update(+id, updateOrderItemDto);
  }

  @Delete(':id')
  remove(@Param() { id }: IdDto) {
    return this.orderItemsService.remove(+id);
  }
}
