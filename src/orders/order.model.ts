import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../users/user.entity';
import { Product } from '../products/product.entity';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  quantity: number;

  @ManyToOne(() => User, (user) => user.orders)
  @JoinColumn()
  user: User;

  @ManyToOne(() => Product)
  @JoinColumn()
  product: Product;
}
