import {Controller,Get,Post,Body,Param,Put,Delete,NotFoundException,UseGuards,} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from '../admin/dto/create-product.dto';
import { UpdateProductDto } from '../admin/dto/update-product.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { Product } from './product.entity';

@Controller('products')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  async getAll(): Promise<Product[]> {
    return this.productsService.findAll();
  }

  @Get(':id')
  async getById(@Param('id') id: string): Promise<Product> {
    const product = await this.productsService.findById(Number(id));
    if (!product) throw new NotFoundException('Producto no encontrado');
    return product;
  }

  @Post()
  @Roles('admin')
  async create(@Body() createDto: CreateProductDto): Promise<Product> {
    return this.productsService.create(createDto);
  }

  @Put(':id')
  @Roles('admin')
  async update(
    @Param('id') id: string,
    @Body() updateDto: UpdateProductDto,
  ): Promise<Product> {
    const updated = await this.productsService.update(Number(id), updateDto);
    if (!updated) throw new NotFoundException('Producto no encontrado');
    return updated;
  }

  @Delete(':id')
  @Roles('admin')
  async remove(@Param('id') id: string): Promise<{ message: string }> {
    await this.productsService.delete(Number(id));
    return { message: 'Producto eliminado correctamente' };
  }
}
