import { RegistryDates } from 'common/embedded/registry-dates.embedded';
import { Order } from 'orders/entities/order.entity';
import { Product } from 'products/entities/product.entity';
import {
  Column,
  Entity,
  ManyToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class OrderItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  quantity: number;

  @Column({ type: 'decimal', precision: 6, scale: 2 })
  price: number;

  @PrimaryColumn()
  orderId: number;

  @PrimaryColumn()
  productId: number;

  @ManyToOne(() => Order, (order) => order.items, { onDelete: 'CASCADE' })
  order: Order;

  @ManyToOne(() => Product, (product) => product.items)
  product: Product;

  @Column(() => RegistryDates, { prefix: false })
  registryDates: RegistryDates;
}
