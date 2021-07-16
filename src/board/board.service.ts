import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';
import { Repository } from 'typeorm';
import { Board } from './board.entity';
import CreateBoardDto from './dto/create-board.dto';

@Injectable()
export class BoardService {
  constructor(
    @InjectRepository(Board)
    private boardsRepository: Repository<Board>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(data: CreateBoardDto, user: User): Promise<Board> {
    const board = this.boardsRepository.create(data);

    board.owner = user;
    board.users = [user];

    await this.boardsRepository.save(board);

    return board;
  }

  async findAll(user: User): Promise<Board[]> {
    const current = await this.usersRepository.findOne(user, {
      relations: ['sharedBoards'],
    });

    return current.sharedBoards;
  }

  async shareWithUsers(boardId: number, userIds: number[]): Promise<Board> {
    const board = await this.boardsRepository.findOne(boardId, {
      relations: ['users'],
    });
    const users = await this.usersRepository.findByIds(userIds);

    board.users = [...board.users, ...users];

    await this.boardsRepository.save(board);

    return board;
  }
}
