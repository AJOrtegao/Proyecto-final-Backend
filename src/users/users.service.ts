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

  async create(data: Partial<User>): Promise<User> {
    const newUser = new this.userModel(data);
    return await newUser.save();
  }

  async findByEmail(email: string): Promise<User | null> {
    return await this.userModel.findOne({ email }).lean();
  }

  async findAll(): Promise<User[]> {
    return await this.userModel.find().lean();
  }

  async findById(id: number): Promise<UserEntity | null> {
    return await this.userRepository.findOne({ where: { id } });
  }
}
