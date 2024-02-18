import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
  Delete,
} from '@nestjs/common';
import { ChaptersService } from './chapters.service';
import { Chapter } from './chapters.entity';
import { Role } from 'src/roles/roles.enum';
import { AuthGuard } from 'src/auth/auth.guard';
import { Roles } from 'src/roles/roles.decorator';

@Controller('chapters')
export class ChaptersController {
  constructor(private chapterService: ChaptersService) {}

  @Get()
  @UseGuards(AuthGuard)
  async getCategory(): Promise<Chapter[]> {
    return this.chapterService.findAll();
  }

  @Post()
  @UseGuards(AuthGuard)
  @Roles(Role.Author)
  async addChapter(@Body() Chapter: Chapter): Promise<Chapter> {
    return this.chapterService.create(Chapter);
  }

  @Put(':id')
  @UseGuards(AuthGuard)
  @Roles(Role.Author)
  async updateChapter(
    @Param('id') id: number,
    @Body() Chapter: Chapter,
  ): Promise<Chapter> {
    return this.chapterService.update(id, Chapter);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  @Roles(Role.Admin)
  async deleteChapter(@Param('id') id: number): Promise<void> {
    return this.chapterService.remove(id);
  }
}
