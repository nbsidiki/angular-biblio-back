import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { UploadController } from './upload.controller';
import * as path from 'path';

@Module({
  imports: [
    MulterModule.register({
      dest: path.join(__dirname, '..', '..', 'images'), // Répertoire où enregistrer les fichiers
    }),
  ],
  controllers: [UploadController],
})
export class UploadModule {}
