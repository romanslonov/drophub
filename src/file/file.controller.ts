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
import { UserService } from 'src/user/user.service';
import { FileService } from './file.service';

@Controller('boards/:id/files')
export class FileController {
  constructor(
    private uploadService: UploadService,
    private fileService: FileService,
    private userService: UserService,
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FilesInterceptor('files'))
  async upload(
    @UploadedFiles() files: Express.Multer.File[],
    @Param('id') boardId: number,
    @Request() req,
  ) {
    try {
      const uploads = files.map((file) => this.uploadService.upload(file));

      const uploaded = await Promise.all(uploads).then((data) => data);

      const saving = (uploaded as ManagedUpload.SendData[]).map(
        (item, index) => {
          const file = files[index];
          return this.fileService.create(req.user.id, boardId, {
            name: file.originalname,
            key: item.Key,
            size: file.size,
          });
        },
      );

      const saved = await Promise.all(saving);

      const sum = saved.reduce((sum, file) => sum + file.size, 0);

      await this.userService.updateUserUsage(req.user.id, sum);

      return { files: saved };
    } catch (error) {
      console.error(error);
    }
  }
}
