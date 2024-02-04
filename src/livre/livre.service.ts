import { Injectable } from '@nestjs/common';
import { Livre } from './livre.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class LivreService {
  constructor(
    @InjectRepository(Livre)
    private livresRepository: Repository<Livre>,
  ) {}

  async findAll(): Promise<Livre[]> {
    return this.livresRepository.find();
  }

  async findOne(id: number): Promise<Livre | null> {
    return this.livresRepository.findOneBy({ id });
  }

  async findByTitle(title: string): Promise<Livre | null> {
    return this.livresRepository.findOneBy({ title });
  }

  async create(livreData: Partial<Livre>): Promise<Livre> {
    const livre = this.livresRepository.create(livreData);
    return this.livresRepository.save(livre);
  }

  async update(id: number, livreData: Partial<Livre>): Promise<Livre> {
    await this.livresRepository.update(id, livreData);
    return this.livresRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.livresRepository.delete(id);
  }
}
