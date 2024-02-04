import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { LivreService } from './livre.service';
import { Livre } from './livre.entity';

@Controller('livres')
export class LivreController {
  constructor(private livreService: LivreService) {}

  @Get()
  async getLivres(): Promise<Livre[]> {
    return this.livreService.findAll();
  }

  @Post()
  async addLivre(@Body() livre: Livre): Promise<Livre> {
    return this.livreService.create(livre);
  }

  @Put(':id')
  async updateLivre(
    @Param('id') id: number,
    @Body() livre: Livre,
  ): Promise<Livre> {
    return this.livreService.update(id, livre);
  }

  @Delete(':id')
  async deleteLivre(@Param('id') id: number): Promise<void> {
    return this.livreService.remove(id);
  }
}
