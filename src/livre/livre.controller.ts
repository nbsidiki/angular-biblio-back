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
  Req,
} from '@nestjs/common';
import { LivreService } from './livre.service';
import { Livre } from './livre.entity';
import { Roles } from 'src/roles/roles.decorator';
import { Role } from 'src/roles/roles.enum';
import { AuthGuard } from 'src/auth/auth.guard';
import { Request } from 'express';

interface CustomRequest extends Request {
  user: any; // ou tout autre type que vous utilisez pour représenter l'utilisateur
}
@Controller('livres')
export class LivreController {
  constructor(private livreService: LivreService) {}

  @Get()
  @UseGuards(AuthGuard)
  async getLivres(): Promise<Livre[]> {
    return this.livreService.findAll();
  }
  @Get('byUser')
  @UseGuards(AuthGuard)
  async getLivresByUser(@Req() req: CustomRequest): Promise<Livre[]> {
    const user = req.user;
    return this.livreService.findByUser(user.sub);
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  async getLivre(@Param('id') id: number): Promise<Livre> {
    return this.livreService.findOne(id);
  }
  @Get(':title')
  @UseGuards(AuthGuard)
  async getLivreByTitle(@Param('title') id: number): Promise<Livre> {
    return this.livreService.findOne(id);
  }

  @Post()
  @UseGuards(AuthGuard)
  @Roles(Role.Author)
  async addLivre(
    @Body() livre: Livre,
    @Req() req: CustomRequest,
  ): Promise<Livre> {
    const user = req.user;
    const existingLivre = await this.livreService.findByTitle(livre.title);
    if (existingLivre) {
      throw new HttpException(
        'Cette ressource existe déjà',
        HttpStatus.CONFLICT,
      );
    }
    console.log(livre);
    return this.livreService.create(livre, user.sub);
  }

  @Put(':id')
  @UseGuards(AuthGuard)
  @Roles(Role.Author)
  async updateLivre(
    @Param('id') id: number,
    @Body() livre: Livre,
    @Req() req: CustomRequest,
  ): Promise<Livre> {
    const user = req.user;
    return this.livreService.update(id, livre, user.sub);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  @Roles(Role.Admin)
  async deleteLivre(@Param('id') id: number): Promise<void> {
    return this.livreService.remove(id);
  }
}
