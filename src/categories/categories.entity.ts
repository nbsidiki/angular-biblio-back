import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Livre } from '../livre/livre.entity';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nom: string;

  @OneToMany(() => Livre, (livre) => livre.category)
  livres: Livre[];
}
