import { Controller, Get, Param, NotFoundException } from '@nestjs/common';
import { UsersService } from './users.service';
import { OrdersService } from '../orders/orders.service';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly ordersService: OrdersService,
  ) {}

  @Get(':id/orders/:orderId')
  async getOrderById(@Param('id') id: string, @Param('orderId') orderId: string) {
    const order = await this.ordersService.findByIdAndUser(Number(orderId), Number(id));
    if (!order) {
      throw new NotFoundException(`Orden con ID ${orderId} no encontrada para el usuario ${id}`);
    }
    return order;
  }

  @Get(':id/orders')
  async getOrdersByUser(@Param('id') id: string) {
    return this.ordersService.findAllByUser(Number(id));
  }

  @Get(':id')
  async getUserById(@Param('id') id: string) {
    const user = await this.usersService.findById(id);
    if (!user) {
      throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
    }
    return user;
  }
}
