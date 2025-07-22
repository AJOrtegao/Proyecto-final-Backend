import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Payment, PaymentStatus } from './payment.entity';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { Order } from '../orders/order.entity';

@Injectable()
export class PaymentsService {
  constructor(
    @InjectRepository(Payment)
    private readonly paymentRepository: Repository<Payment>,

    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
  ) {}

  async findAll(): Promise<Payment[]> {
    return this.paymentRepository.find({ relations: ['order'] });
  }

  async create(createPaymentDto: CreatePaymentDto): Promise<Payment> {
    const { amount, paymentMethod, orderId } = createPaymentDto;

    const order = await this.orderRepository.findOne({ where: { id: orderId } });
    if (!order) {
      throw new NotFoundException(`Orden con ID ${orderId} no encontrada`);
    }

    const payment = this.paymentRepository.create({
      amount,
      paymentMethod: paymentMethod || 'efectivo',
      status: PaymentStatus.PAID,
      order,
    });

    return this.paymentRepository.save(payment);
  }
}
