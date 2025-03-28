import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { User } from "../User/user.entity";

export type ProductCategory =
  | "clothing"
  | "electronics"
  | "furniture"
  | "toys"
  | "books"
  | "other"
  | "food"
  | "accessories"
  | "sports"
  | "health"
  | "beauty"
  | "automotive"
  | "garden"
  | "pet"
  | "music"
  | "videoGames"
  | "homeAppliances";

@Entity()
export class Product {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column({ type: "decimal", precision: 2 })
  price: number;

  @Column()
  description: string;

  @Column()
  category: ProductCategory;

  @Column()
  userId: string;

  @ManyToOne(() => User, (user) => user.products)
  user: User;

  @Column()
  mainImage: string;

  @Column({
    type: "simple-array",
    nullable: true,
  })
  images: string[];
}
