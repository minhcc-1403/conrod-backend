import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationDto } from 'common/dto/pagination.dto';
import { DefaultPageSize } from 'common/util/common.constants';
import { CreateOrderItemDto } from 'order-items/dto/create-order-item.dto';
import { UpdateOrderItemDto } from 'order-items/dto/update-order-item.dto';
import { OrderItem } from 'order-items/entities/order-item.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OrderItemsService {
  constructor(
    @InjectRepository(OrderItem)
    private readonly orderItemsRepository: Repository<OrderItem>,
  ) {}

  create(createOrderItemDto: CreateOrderItemDto) {
    const orderItem = this.orderItemsRepository.create(createOrderItemDto);
    return this.orderItemsRepository.save(orderItem);
  }

  findAll(paginationDto: PaginationDto) {
    const { limit, offset } = paginationDto;

    return this.orderItemsRepository.find({
      skip: offset,
      take: limit ?? DefaultPageSize.USERS,
    });
  }

  async findOne(id: number) {
    const orderItem = await this.orderItemsRepository.findOne({
      where: { id },
    });
    if (!orderItem) {
      throw new NotFoundException('OrderItem not found');
    }
    return orderItem;
  }

  async update(id: number, updateOrderItemDto: UpdateOrderItemDto) {
    const orderItem = await this.orderItemsRepository.preload({
      id,
      ...updateOrderItemDto,
    });
    if (!orderItem) {
      throw new NotFoundException('OrderItem not found');
    }
    return this.orderItemsRepository.save(orderItem);
  }

  async remove(id: number) {
    const orderItem = await this.findOne(id);
    return this.orderItemsRepository.remove(orderItem);
  }
}
