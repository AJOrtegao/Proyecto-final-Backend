import {
  Controller,
  Post,
  Get,
  Param,
  Patch,
  Body,
  Request,
  NotFoundException,
  UseGuards,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { Order } from './order.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UpdateOrderDto } from './dto/update-order.dto';

@Controller('orders')
@UseGuards(JwtAuthGuard)
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  async create(
    @Request() req,
    @Body() createOrderDto: CreateOrderDto,
  ): Promise<Order> {
    const userId = req.user.sub;
    return this.ordersService.create(userId, createOrderDto);
  }

  @Get()
  async getOrders(@Request() req): Promise<Order[]> {
    const userId = req.user.sub;
    return this.ordersService.findAllByUser(userId);
  }

  @Get(':id')
  async getOrderById(
    @Param('id') id: string,
    @Request() req,
  ): Promise<Order> {
    const orderId = parseInt(id, 10);
    const userId = req.user.sub;
    const order = await this.ordersService.findByIdAndUser(orderId, userId);

    if (!order) {
      throw new NotFoundException('Pedido no encontrado');
    }

    return order;
  }
  
  @Patch(':id')
  updateOrder(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.ordersService.update(parseInt(id, 10), updateOrderDto);

  }
}
