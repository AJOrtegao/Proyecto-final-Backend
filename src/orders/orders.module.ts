import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MongooseModule } from '@nestjs/mongoose';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { Order } from './order.entity';
import { OrderItem } from './entities/order-item.entity';
import { Product } from '../products/product.entity';
import { UsersModule } from '../users/users.module';
import { Order as OrderSchemaClass, OrderSchema } from './schemas/order.schema';

@Module({
  imports: [
    TypeOrmModule.forFeature([Order, OrderItem, Product]),
    MongooseModule.forFeature([{ name: OrderSchemaClass.name, schema: OrderSchema }]),
    forwardRef(() => UsersModule),
  ],
  controllers: [OrdersController],
  providers: [OrdersService],
  exports: [OrdersService],
})
export class OrdersModule {}
