import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './user/user.module';
import { ProfileController } from './profile/profile.controller';
import { KnexModule } from 'nestjs-knex';
import { ConfigModule } from '@nestjs/config';
import { BoardController } from './board/board.controller';
import { BoardModule } from './board/board.module';
import { UploadService } from './upload/upload.service';
import { UploadModule } from './upload/upload.module';
import { FileController } from './file/file.controller';
import { FileModule } from './file/file.module';
import knexConfig from '../knexfile';

@Module({
  imports: [
    ConfigModule.forRoot(),
    KnexModule.forRoot({
      config: knexConfig,
    }),
    AuthModule,
    UsersModule,
    BoardModule,
    UploadModule,
    FileModule,
  ],
  controllers: [
    AppController,
    ProfileController,
    BoardController,
    FileController,
  ],
  providers: [AppService, UploadService],
})
export class AppModule {}
