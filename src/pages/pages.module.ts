import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Page } from './pages.entity';
import { PagesController } from './pages.controller';
import { PagesService } from './pages.service';
import { LivreService } from 'src/livre/livre.service';
import { LivreModule } from 'src/livre/livre.module';

@Module({
  imports: [TypeOrmModule.forFeature([Page]), LivreModule],
  controllers: [PagesController],
  providers: [PagesService],
  exports: [TypeOrmModule],
})
export class PagesModule {}
