import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
  JoinColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Page } from '../pages/pages.entity';
import { Category } from 'src/categories/categories.entity';
import { User } from 'src/users/users.entity';
import { Chapter } from 'src/chapters/chapters.entity';
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

  @Column({ type: 'longblob', nullable: true })
  image: Buffer;

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

  @OneToMany(() => Chapter, (chapter) => chapter.livre, {
    cascade: true,
    nullable: true,
  })
  chapters: Chapter[];

  @ManyToMany(() => Category)
  @JoinTable()
  category: Category[];
}
