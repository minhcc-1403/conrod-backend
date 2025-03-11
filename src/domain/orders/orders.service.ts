import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationDto } from 'common/dto/pagination.dto';
import { DefaultPageSize } from 'common/util/common.constants';
import { CreateOrderDto } from 'orders/dto/create-order.dto';
import { UpdateOrderDto } from 'orders/dto/update-order.dto';
import { Order } from 'orders/entities/order.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly ordersRepository: Repository<Order>,
  ) {}

  create(createOrderDto: CreateOrderDto) {
    const order = this.ordersRepository.create(createOrderDto);
    return this.ordersRepository.save(order);
  }

  findAll(paginationDto: PaginationDto) {
    const { limit, offset } = paginationDto;

    return this.ordersRepository.find({
      skip: offset,
      take: limit ?? DefaultPageSize.USERS,
    });
  }

  async findOne(id: number) {
    const order = await this.ordersRepository.findOne({
      where: { id },
      relations: { customer: true },
    });
    if (!order) {
      throw new NotFoundException('Order not found');
    }
    return order;
  }

  async update(id: number, updateOrderDto: UpdateOrderDto) {
    const order = await this.ordersRepository.preload({
      id,
      ...updateOrderDto,
    });
    if (!order) {
      throw new NotFoundException('Order not found');
    }
    return this.ordersRepository.save(order);
  }

  async remove(id: number) {
    const order = await this.findOne(id);
    return this.ordersRepository.remove(order);
  }
}
