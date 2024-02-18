import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  UseGuards,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as path from 'path';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('upload')
export class UploadController {
  @Post()
  @UseGuards(AuthGuard)
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: path.join(__dirname, '..', '..', 'images'),
        filename: (req, file, cb) => {
          const filename = `${Date.now()}${path.extname(file.originalname)}`;
          cb(null, filename);
        },
      }),
    }),
  )
  async uploadFile(@UploadedFile() file): Promise<any> {
    console.log(file); // Vérifiez la sortie de la console pour voir si le fichier est correctement reçu
    if (!file) {
      throw new Error('No file uploaded');
    }
    // Le fichier est enregistré dans le répertoire './uploads'
    // Vous pouvez retourner l'URL du fichier enregistré pour l'afficher ou le manipuler ultérieurement
    return { imgUrl: `/images/${file.filename}` };
  }
}
