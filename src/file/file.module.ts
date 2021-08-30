import { Module } from '@nestjs/common';
import { UploadModule } from 'src/upload/upload.module';
import { FileController } from './file.controller';
import { FileService } from './file.service';

@Module({
  imports: [UploadModule],
  providers: [FileService],
  exports: [FileService],
  controllers: [FileController],
})
export class FileModule {}
