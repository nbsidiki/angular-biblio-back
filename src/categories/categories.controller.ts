import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { Category } from './categories.entity';
import { CategoriesService } from './categories.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { Roles } from 'src/roles/roles.decorator';
import { Role } from 'src/roles/roles.enum';

@Controller('categories')
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {}

  @Get()
  @UseGuards(AuthGuard)
  async getCategory(): Promise<Category[]> {
    return this.categoriesService.findAll();
  }

  @Post()
  @UseGuards(AuthGuard)
  @Roles(Role.Admin)
  async addCategory(@Body() category: Category): Promise<Category> {
    return this.categoriesService.create(category);
  }

  @Put(':id')
  @UseGuards(AuthGuard)
  @Roles(Role.Admin)
  async updateCategory(
    @Param('id') id: number,
    @Body() category: Category,
  ): Promise<Category> {
    return this.categoriesService.update(id, category);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  @Roles(Role.Admin)
  async deleteCategory(@Param('id') id: number): Promise<void> {
    return this.categoriesService.remove(id);
  }
}
