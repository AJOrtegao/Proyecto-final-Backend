import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type OrderDocument = Order & Document;

@Schema({ timestamps: true })
export class Order {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  user: Types.ObjectId;

  @Prop({ required: true })
  total: number;

  @Prop({ default: 'pendiente' })
  status: string;

  @Prop({ type: [Object], default: [] })
  items: any[];
}

export const OrderSchema = SchemaFactory.createForClass(Order);
