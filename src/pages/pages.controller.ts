import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { PagesService } from './pages.service';
import { Page } from './pages.entity';
import { AuthGuard } from 'src/auth/auth.guard';
import { Role } from 'src/roles/roles.enum';
import { Roles } from 'src/roles/roles.decorator';

@Controller('pages')
export class PagesController {
  constructor(private pageService: PagesService) {}

  @Get()
  @UseGuards(AuthGuard)
  async getPages(): Promise<Page[]> {
    return this.pageService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  async getPage(@Param('id') id: number): Promise<Page> {
    return this.pageService.findOne(id);
  }

  @Post()
  @UseGuards(AuthGuard)
  @Roles(Role.Author)
  async addPage(@Body() page: Page): Promise<Page> {
    return this.pageService.create(page);
  }

  @Put(':id')
  @UseGuards(AuthGuard)
  async updatePage(@Param('id') id: number, @Body() page: Page): Promise<Page> {
    return this.pageService.update(id, page);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  async deletePage(@Param('id') id: number): Promise<void> {
    return this.pageService.remove(id);
  }
}
