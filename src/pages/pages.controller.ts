import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Delete,
} from '@nestjs/common';
import { PagesService } from './pages.service';
import { Page } from './pages.entity';

@Controller('pages')
export class PagesController {
  constructor(private pageService: PagesService) {}

  @Get()
  async getPages(): Promise<Page[]> {
    return this.pageService.findAll();
  }

  @Post()
  async addPage(@Body() page: Page): Promise<Page> {
    return this.pageService.create(page);
  }

  @Put(':id')
  async updatePage(@Param('id') id: number, @Body() page: Page): Promise<Page> {
    return this.pageService.update(id, page);
  }

  @Delete(':id')
  async deletePage(@Param('id') id: number): Promise<void> {
    return this.pageService.remove(id);
  }
}
