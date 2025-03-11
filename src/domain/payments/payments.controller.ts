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
import { CreatePaymentDto } from 'payments/dto/create-payment.dto';
import { UpdatePaymentDto } from 'payments/dto/update-payment.dto';
import { PaymentsService } from './payments.service';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post()
  create(@Body() createPaymentDto: CreatePaymentDto) {
    return this.paymentsService.create(createPaymentDto);
  }

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.paymentsService.findAll(paginationDto);
  }

  @Get(':id')
  findOne(@Param() { id }: IdDto) {
    return this.paymentsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param() { id }: IdDto, @Body() updatePaymentDto: UpdatePaymentDto) {
    return this.paymentsService.update(+id, updatePaymentDto);
  }

  @Delete(':id')
  remove(@Param() { id }: IdDto) {
    return this.paymentsService.remove(+id);
  }
}
