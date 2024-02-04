import { Module } from '@nestjs/common';
import { LivreController } from './livre.controller';
import { LivreService } from './livre.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Livre } from './livre.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Livre])],
  controllers: [LivreController],
  providers: [LivreService],
  exports: [TypeOrmModule],
})
export class LivreModule {}
