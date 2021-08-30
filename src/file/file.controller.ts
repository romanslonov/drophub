import {
  Controller,
  Param,
  Post,
  Request,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ManagedUpload } from 'aws-sdk/clients/s3';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UploadService } from 'src/upload/upload.service';
import { FileService } from './file.service';

@Controller('boards/:id/files')
export class FileController {
  constructor(
    private uploadService: UploadService,
    private fileService: FileService,
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FilesInterceptor('files'))
  async upload(
    @UploadedFiles() files: Express.Multer.File[],
    @Param('id') boardId: number,
    @Request() req,
  ) {
    const uploads = files.map((file) => this.uploadService.upload(file));

    const uploaded = await Promise.all(uploads)
      .then((data) => data)
      .catch((error) => {
        console.error(error);
      });

    const saving = (uploaded as ManagedUpload.SendData[]).map((item) => {
      const file = files.find((f) => f.originalname === item.Key);
      return this.fileService.create(req.user.id, boardId, {
        name: item.Key,
        size: file.size,
      });
    });

    const saved = await Promise.all(saving);

    return { files: saved };
  }
}
