import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User, UserDocument } from './schemas/user.schema';
import { User as UserEntity } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,

    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  // Función para crear un usuario en MongoDB (si es necesario para alguna funcionalidad)
  async create(data: Partial<User>): Promise<User> {
    const newUser = new this.userModel(data);
    return await newUser.save();
  }

  // Función para crear un usuario en PostgreSQL (que parece ser tu base de datos principal)
  async createPostgres(data: Partial<UserEntity>): Promise<UserEntity> {
    const newUser = this.userRepository.create(data);
    return await this.userRepository.save(newUser);
  }

  // Buscar un usuario por email en MongoDB
  async findByEmail(email: string): Promise<User | null> {
    return await this.userModel.findOne({ email }).lean();
  }

  // Buscar todos los usuarios en MongoDB
  async findAll(): Promise<User[]> {
    return await this.userModel.find().lean();
  }

  // Buscar un usuario por ID en PostgreSQL
  async findById(id: string): Promise<UserEntity | null> {
    return await this.userRepository.findOne({ where: { id } });
  }

  // Verifica si un correo ya está registrado en PostgreSQL
  async findByEmailPostgres(email: string): Promise<UserEntity | null> {
    return await this.userRepository.findOne({ where: { email } });
  }
}