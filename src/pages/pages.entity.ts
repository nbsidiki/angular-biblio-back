import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Livre } from '../livre/livre.entity';

@Entity()
export class Page {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  titre: string;

  @Column({ nullable: true })
  contenu: string;

  @ManyToOne(() => Livre, (livre) => livre.pages, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'livreId' })
  livre: Livre;
}
