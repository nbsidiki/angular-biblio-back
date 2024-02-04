import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  HttpException,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { LivreService } from './livre.service';
import { Livre } from './livre.entity';
import { Roles } from 'src/roles/roles.decorator';
import { Role } from 'src/roles/roles.enum';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('livres')
export class LivreController {
  constructor(private livreService: LivreService) {}

  @Get()
  @UseGuards(AuthGuard)
  async getLivres(): Promise<Livre[]> {
    return this.livreService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  async getLivre(@Param('id') id: number): Promise<Livre> {
    return this.livreService.findOne(id);
  }

  @Post()
  @UseGuards(AuthGuard)
  @Roles(Role.Author)
  async addLivre(@Body() livre: Livre): Promise<Livre> {
    const existingLivre = await this.livreService.findByTitle(livre.title);
    if (existingLivre) {
      throw new HttpException(
        'Cette ressource existe déjà',
        HttpStatus.CONFLICT,
      );
    }
    return this.livreService.create(livre);
  }

  @Put(':id')
  @UseGuards(AuthGuard)
  @Roles(Role.Author)
  async updateLivre(
    @Param('id') id: number,
    @Body() livre: Livre,
  ): Promise<Livre> {
    return this.livreService.update(id, livre);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  @Roles(Role.Admin)
  async deleteLivre(@Param('id') id: number): Promise<void> {
    return this.livreService.remove(id);
  }
}
