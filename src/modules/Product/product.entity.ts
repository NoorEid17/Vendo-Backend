import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Category } from "../Category/category.entity";
import { User } from "../User/user.entity";

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
  categoryId: string;

  @Column()
  userId: string;

  @ManyToOne(() => Category, (category) => category.products)
  category: Category;

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
