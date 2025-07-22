import { IsString, IsOptional, IsNumber, IsEnum } from 'class-validator';
import { PaymentStatus } from '../payment.entity';

export class CreatePaymentDto {
  @IsNumber()
  amount: number;

  @IsString()
  @IsOptional()
  paymentMethod?: string;

  @IsNumber()
  orderId: number;

  @IsOptional()
  @IsEnum(PaymentStatus, {
    message: 'El estado debe ser pending, paid o failed',
  })
  status?: PaymentStatus;
}
