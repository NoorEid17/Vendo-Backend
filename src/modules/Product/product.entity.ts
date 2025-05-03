import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from "typeorm";
import { User } from "../User/user.entity";

export const ProductCategories = [
  "furniture",
  "cars",
  "cameras",
  "games",
  "clothing",
  "sports",
  "movies & music",
  "books",
  "other",
  "electronics",
  "home appliances",
  "toys",
  "bicycles",
  "tools",
  "pet supplies",
  "mobile phones",
  "watches",
  "beauty & personal care",
  "office equipment",
  "real estate",
] as const;

export type ProductCategory = (typeof ProductCategories)[number];

@Entity()
export class Product {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  title: string;

  @Column({ type: "decimal", scale: 2 })
  price: number;

  @Column({
    default: "",
  })
  description: string;

  @Column()
  location: string;

  @Column()
  phoneNumber: string;

  @Column()
  category: ProductCategory;

  @Column()
  userId: string;

  @ManyToOne(() => User, (user) => user.products, { eager: true })
  user: User;

  @Column()
  mainImage: string;

  @Column({
    type: "simple-array",
    nullable: true,
  })
  images: string[];

  @Column()
  whatsappLink: string;

  @CreateDateColumn()
  createdAt: Date;
}
