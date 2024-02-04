import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { Page } from '../pages/pages.entity';
import { Category } from 'src/categories/categories.entity';
@Entity()
export class Livre {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  titre: string;

  @Column()
  auteur: string;

  @Column({ nullable: true })
  contenu: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  dateCreation: Date;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  dateModification: Date;
  @OneToMany(() => Page, (page) => page.livre, { cascade: true })
  pages: Page[];

  @ManyToOne(() => Category, (category) => category.livres)
  category: Category;
}
