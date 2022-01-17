import { Injectable } from '@nestjs/common';
import { InjectKnex, Knex } from 'nestjs-knex';
import CreateFileDto from './dto/create-file.dto';

@Injectable()
export class FileService {
  constructor(@InjectKnex() private knex: Knex) {}

  async create(userId: number, boardId: number, data: CreateFileDto) {
    const [id] = await this.knex('files').insert({
      ...data,
      ownerId: userId,
      boardId,
    });
    const { ownerId, ...file } = await this.knex('files')
      .select('id', 'name', 'key', 'size', 'ownerId', 'uploadedAt')
      .where({ id })
      .first();
    const owner = await this.knex('users')
      .select('id', 'email', 'name')
      .where({ id: ownerId })
      .first();

    return { ...file, owner };
  }
}
