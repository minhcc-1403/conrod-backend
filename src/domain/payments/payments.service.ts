import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationDto } from 'common/dto/pagination.dto';
import { DefaultPageSize } from 'common/util/common.constants';
import { CreatePaymentDto } from 'payments/dto/create-payment.dto';
import { UpdatePaymentDto } from 'payments/dto/update-payment.dto';
import { Payment } from 'payments/entities/payment.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PaymentsService {
  constructor(
    @InjectRepository(Payment)
    private readonly paymentsRepository: Repository<Payment>,
  ) {}

  create(createPaymentDto: CreatePaymentDto) {
    const payment = this.paymentsRepository.create(createPaymentDto);
    return this.paymentsRepository.save(payment);
  }

  findAll(paginationDto: PaginationDto) {
    const { limit, offset } = paginationDto;

    return this.paymentsRepository.find({
      skip: offset,
      take: limit ?? DefaultPageSize.USERS,
    });
  }

  async findOne(id: number) {
    const payment = await this.paymentsRepository.findOne({
      where: { id },
    });
    if (!payment) {
      throw new NotFoundException('Payment not found');
    }
    return payment;
  }

  async update(id: number, updatePaymentDto: UpdatePaymentDto) {
    const payment = await this.paymentsRepository.preload({
      id,
      ...updatePaymentDto,
    });
    if (!payment) {
      throw new NotFoundException('Payment not found');
    }
    return this.paymentsRepository.save(payment);
  }

  async remove(id: number) {
    const payment = await this.findOne(id);
    return this.paymentsRepository.remove(payment);
  }
}
