import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Livre } from '../livre/livre.entity';
import { Chapter } from 'src/chapters/chapters.entity';

@Entity()
export class Page {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text', nullable: true })
  contenu: string;

  @Column({ nullable: true })
  pageNumber: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  @ManyToOne(() => Livre, (livre) => livre.pages, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'livreId' })
  livre: Livre;

  @ManyToOne(() => Chapter, (chapter) => chapter.pages, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'chapterId' })
  chapter: Chapter;
}
