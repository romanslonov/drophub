import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Board } from 'src/board/board.entity';
import { User } from 'src/users/user.entity';
import { Repository } from 'typeorm';
import CreateFileDto from './dto/create-file.dto';
import { File } from './file.entity';

@Injectable()
export class FileService {
  constructor(
    @InjectRepository(File)
    private fileRepository: Repository<File>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Board)
    private boardRepository: Repository<Board>,
  ) {}

  async create(userId: number, boardId: number, data: CreateFileDto) {
    const file = this.fileRepository.create(data);
    const board = await this.boardRepository.findOne(boardId);
    const user = await this.userRepository.findOne(userId);

    file.author = user;
    file.board = board;

    await this.fileRepository.save(file);

    return file;
  }
}
