import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Chapter } from './chapters.entity';

@Injectable()
export class ChaptersService {
  constructor(
    @InjectRepository(Chapter)
    private chaptersRepository: Repository<Chapter>,
  ) {}

  async findAll(): Promise<Chapter[]> {
    return this.chaptersRepository.find();
  }

  async findOne(id: number): Promise<Chapter | null> {
    return this.chaptersRepository.findOneBy({ id });
  }

  async create(chapterData: Partial<Chapter>): Promise<Chapter> {
    const chapter = this.chaptersRepository.create(chapterData);
    return this.chaptersRepository.save(chapter);
  }

  async update(id: number, chapterData: Partial<Chapter>): Promise<Chapter> {
    await this.chaptersRepository.update(id, chapterData);
    return this.chaptersRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.chaptersRepository.delete(id);
  }
}
