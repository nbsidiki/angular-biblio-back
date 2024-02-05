import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Page } from '../pages/pages.entity';
import { Category } from 'src/categories/categories.entity';
import { User } from 'src/users/users.entity';
@Entity()
export class Livre {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @ManyToOne(() => User, (user) => user.livres, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'authorId' })
  author: User;

  @Column({ nullable: true })
  resume: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  @OneToMany(() => Page, (page) => page.livre, {
    cascade: true,
    nullable: true,
  })
  pages: Page[];

  @ManyToOne(() => Category, (category) => category.livres, { nullable: true })
  @JoinColumn({ name: 'categoryId' })
  category: Category;
}
