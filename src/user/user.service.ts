import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectKnex, Knex } from 'nestjs-knex';
import { User } from 'src/types/knex';
import CreateUserDto from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(@InjectKnex() private knex: Knex) {}

  async findByEmail(email: string): Promise<User> {
    const user = await this.knex('users').where({ email }).first();

    if (user) {
      return user;
    }
    throw new HttpException(
      'User with this email does not exist',
      HttpStatus.NOT_FOUND,
    );
  }

  async findById(id: number): Promise<User> {
    const user = await this.knex<User>('users').where({ id }).first();

    if (user) {
      return user;
    }
    throw new HttpException(
      'User with this id does not exist',
      HttpStatus.NOT_FOUND,
    );
  }

  async create(userData: CreateUserDto): Promise<User> {
    const [id] = await this.knex('users').insert(userData);
    const user = await this.knex('users').where({ id }).first();

    return user;
  }

  async updateUserUsage(id: number, usage: number): Promise<User> {
    return this.knex<User>('users').where({ id }).update({ usage });
  }
}
