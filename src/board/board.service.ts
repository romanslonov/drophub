import CreateBoardDto from './dto/create-board.dto';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectKnex, Knex } from 'nestjs-knex';
import { Board, User } from 'src/types/knex';

@Injectable()
export class BoardService {
  constructor(@InjectKnex() private knex: Knex) {}

  async create(data: CreateBoardDto, user: User): Promise<Board> {
    const [id] = await this.knex('boards').insert({
      ...data,
      ownerId: user.id,
    });

    const { ownerId, ...board } = await this.knex('boards')
      .where({ id })
      .first();
    const owner = await this.knex('users')
      .select('id', 'name', 'email')
      .where({ id: ownerId })
      .first();

    return { ...board, owner };
  }

  async getBoards(user: User): Promise<Board[]> {
    const boards = this.knex('boards')
      .select('id', 'name')
      .where({ ownerId: user.id });

    return boards;
  }

  // async shareWithUsers(boardId: number, userIds: number[]): Promise<Board> {
  // const board = await this.boardRepository.findOne(boardId, {
  //   relations: ['users'],
  // });
  // const users = await this.usersRepository.findByIds(userIds);
  // board.users = [...board.users, ...users];
  // await this.boardRepository.save(board);
  // return board;
  // }

  async getBoard(boardId: number, userId: number): Promise<Board> {
    const board = await this.knex('boards')
      .where({ id: boardId, ownerId: userId })
      .first();
    if (!board) {
      throw new HttpException('Board was not found', HttpStatus.NOT_FOUND);
    }
    return board;
  }

  async getBoardFiles(boardId: number, userId: number) {
    await this.getBoard(boardId, userId);

    const files = await this.knex
      .select('id', 'name', 'size', 'ownerId')
      .from('files')
      .where({ boardId });

    const owners = await this.knex('users')
      .select('id', 'name', 'email')
      .whereIn(
        'id',
        files.map((file) => file.ownerId),
      );

    const result = files.map(({ ownerId, ...user }) => ({
      ...user,
      owner: owners.find((owner) => owner.id === ownerId),
    }));

    return result;
  }
}
