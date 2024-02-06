import { Module } from '@nestjs/common';
import { ChaptersService } from './chapters.service';
import { ChaptersController } from './chapters.controller';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from 'src/roles/roles.guard';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Chapter } from './chapters.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Chapter])],
  providers: [
    ChaptersService,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
  controllers: [ChaptersController],
  exports: [TypeOrmModule],
})
export class ChaptersModule {}
