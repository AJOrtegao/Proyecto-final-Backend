import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product, ProductSchema } from './schemas/product.schema';
import { Product as ProductEntity } from './product.entity';  // Asegúrate de que el nombre del archivo y la clase sean correctos
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),  // MongoDB schema
    TypeOrmModule.forFeature([ProductEntity]),  // PostgreSQL entity
  ],
  controllers: [ProductsController],
  providers: [ProductsService],
  exports: [ProductsService],
})
export class ProductsModule {}
