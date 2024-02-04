import { Livre } from 'src/livre/livre.entity';
import { Role } from 'src/roles/roles.enum';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  roles: string;

  @OneToMany(() => Livre, (livre) => livre.author, {
    cascade: true,
    nullable: true,
  })
  livres: Livre[];

  @Column({ default: true })
  isActive: boolean;
}
