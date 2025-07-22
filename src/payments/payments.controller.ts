import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { Payment } from './payment.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreatePaymentDto } from './dto/create-payment.dto';

@Controller('payments')
@UseGuards(JwtAuthGuard)
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Get()
  async getAll(): Promise<Payment[]> {
    return this.paymentsService.findAll();
  }

  @Post()
  async create(@Body() createPaymentDto: CreatePaymentDto): Promise<Payment> {
    return this.paymentsService.create(createPaymentDto);
  }
}
