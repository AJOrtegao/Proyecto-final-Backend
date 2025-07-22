import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentsService } from './payments.service';
import { PaymentsController } from './payments.controller';
import { Payment } from './payment.entity';
import { OrdersModule } from '../orders/orders.module';
import { Order } from '../orders/order.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Payment, Order]),
    OrdersModule,
  ],
  controllers: [PaymentsController],
  providers: [PaymentsService],
})
export class PaymentsModule {}
