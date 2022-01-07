import { Module } from '@nestjs/common';
import { UploadModule } from 'src/upload/upload.module';
import { UsersModule } from 'src/user/user.module';
import { FileController } from './file.controller';
import { FileService } from './file.service';

@Module({
  imports: [UploadModule, UsersModule],
  providers: [FileService],
  exports: [FileService],
  controllers: [FileController],
})
export class FileModule {}
