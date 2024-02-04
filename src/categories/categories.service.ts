import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './categories.entity';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private categoriesRepository: Repository<Category>,
  ) {}

  async findAll(): Promise<Category[]> {
    return this.categoriesRepository.find();
  }

  async findOne(id: number): Promise<Category | null> {
    return this.categoriesRepository.findOneBy({ id });
  }

  async create(categoryData: Partial<Category>): Promise<Category> {
    const Category = this.categoriesRepository.create(categoryData);
    return this.categoriesRepository.save(Category);
  }

  async update(id: number, categoryData: Partial<Category>): Promise<Category> {
    await this.categoriesRepository.update(id, categoryData);
    return this.categoriesRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.categoriesRepository.delete(id);
  }
}
