import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductModel } from '../products/product.model';
import { CreateProductDto } from './dto/create-product.dto';
import { Order } from '../orders/order.entity';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
  ) {}

  async createProduct(createProductDto: CreateProductDto) {
    const newProduct = new ProductModel(createProductDto);
    return await newProduct.save();
  }

  async updateProduct(id: string, updateProductDto: CreateProductDto) {
    return await ProductModel.findByIdAndUpdate(id, updateProductDto, { new: true });
  }

  async deleteProduct(id: string) {
    return await ProductModel.findByIdAndDelete(id);
  }

  async getAllProducts() {
    return await ProductModel.find();
  }

  async getOrders() {
    return await this.orderRepository.find();
  }
}
