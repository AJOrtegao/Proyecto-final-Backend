import { IsOptional, IsEnum } from 'class-validator';
import { OrderStatus } from '../order.entity';

export class UpdateOrderDto {
  @IsOptional()
  @IsEnum(OrderStatus, {
    message: 'El estado debe ser pending, completed o cancelled',
  })
  status?: OrderStatus;
}
