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
import { LivreService } from 'src/livre/livre.service';
import { Livre } from 'src/livre/livre.entity';

@Controller('pages')
export class PagesController {
  constructor(
    private pageService: PagesService,
    private livreService: LivreService,
  ) {}

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

  @Get('number/:id')
  @UseGuards(AuthGuard)
  async getPageNumber(@Param('id') id: number): Promise<number> {
    const livre = await this.livreService.findOne(id);
    return this.pageService.findPageNumber(livre);
  }

  @Post()
  @UseGuards(AuthGuard)
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
  @Roles(Role.Admin)
  async deletePage(@Param('id') id: number): Promise<void> {
    return this.pageService.remove(id);
  }
}
