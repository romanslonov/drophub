import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ProfileController } from './profile/profile.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/user.entity';
import { ConfigModule } from '@nestjs/config';
import { BoardController } from './board/board.controller';
import { Board } from './board/board.entity';
import { BoardModule } from './board/board.module';
import { UploadService } from './upload/upload.service';
import { UploadModule } from './upload/upload.module';
import { FileController } from './file/file.controller';
import { File } from './file/file.entity';
import { FileModule } from './file/file.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    AuthModule,
    UsersModule,
    BoardModule,
    TypeOrmModule.forRoot({
      type: 'mariadb',
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: [User, Board, File],
      synchronize: true,
    }),
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
