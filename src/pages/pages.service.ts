import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Page } from './pages.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PagesService {
  constructor(
    @InjectRepository(Page)
    private pagesRepository: Repository<Page>,
  ) {}

  async findAll(): Promise<Page[]> {
    return this.pagesRepository.find();
  }

  async findOne(id: number): Promise<Page | null> {
    return this.pagesRepository.findOneBy({ id });
  }

  async create(livreData: Partial<Page>): Promise<Page> {
    const livre = this.pagesRepository.create(livreData);
    return this.pagesRepository.save(livre);
  }

  async update(id: number, livreData: Partial<Page>): Promise<Page> {
    await this.pagesRepository.update(id, livreData);
    return this.pagesRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.pagesRepository.delete(id);
  }
}
