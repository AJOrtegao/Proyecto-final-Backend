import { Controller, Get, Post, UseGuards, Body } from '@nestjs/common';
import { AdminService } from './admin.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { CreateProductDto } from './dto/create-product.dto';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post('products')
  @UseGuards(JwtAuthGuard, RolesGuard) // RolesGuard verifica que el usuario sea admin
  createProduct(@Body() createProductDto: CreateProductDto) {
    return this.adminService.createProduct(createProductDto);
  }
 
  @Get('orders')
  @UseGuards(JwtAuthGuard, RolesGuard)
  getOrders() {
    return this.adminService.getOrders();
  }
}