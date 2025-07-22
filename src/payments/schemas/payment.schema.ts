import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PaymentDocument = Payment & Document;

@Schema()
export class Payment {
  @Prop()
  orderId: string;

  @Prop()
  method: string;

  @Prop()
  amount: number;
}

export const PaymentSchema = SchemaFactory.createForClass(Payment);
