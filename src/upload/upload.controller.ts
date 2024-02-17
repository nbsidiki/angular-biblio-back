import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as path from 'path';
import { Multer } from 'multer';

@Controller('upload')
export class UploadController {
  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: '../../images', // Répertoire où enregistrer les fichiers
        filename: (req, file, cb) => {
          const filename = `${Date.now()}${path.extname(file.originalname)}`;
          cb(null, filename);
        },
      }),
    }),
  )
  async uploadFile(@UploadedFile() file: Multer.File): Promise<string> {
    // Le fichier est enregistré dans le répertoire './uploads'
    // Vous pouvez retourner l'URL du fichier enregistré pour l'afficher ou le manipuler ultérieurement
    return `/images/${file.filename}`;
  }
}
