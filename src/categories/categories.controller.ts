import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Category } from './categories.entity';
import { CategoriesService } from './categories.service';

@Controller('categories')
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {}

  @Get()
  async getLivres(): Promise<Category[]> {
    return this.categoriesService.findAll();
  }

  @Post()
  async addCategory(@Body() category: Category): Promise<Category> {
    return this.categoriesService.create(category);
  }

  @Put(':id')
  async updateCategory(
    @Param('id') id: number,
    @Body() category: Category,
  ): Promise<Category> {
    return this.categoriesService.update(id, category);
  }

  @Delete(':id')
  async deleteCategory(@Param('id') id: number): Promise<void> {
    return this.categoriesService.remove(id);
  }
}
