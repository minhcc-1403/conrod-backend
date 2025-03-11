import { Category } from 'categories/entities/category.entity';
import { RegistryDates } from 'common/embedded/registry-dates.embedded';
import { OrderItem } from 'order-items/entities/order-item.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column({ type: 'decimal', precision: 6, scale: 2 })
  price: number;

  @Column(() => RegistryDates, { prefix: false })
  registryDates: RegistryDates;

  @ManyToMany(() => Category, (category) => category.products)
  @JoinTable()
  categories: Category[];

  @OneToMany(() => OrderItem, (item) => item.order, { cascade: true })
  items: OrderItem[];
}
