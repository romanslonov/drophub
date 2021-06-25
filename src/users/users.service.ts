import { Injectable } from '@nestjs/common';

export type User = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

@Injectable()
export class UsersService {
  private readonly users = [
    {
      id: 1,
      firstName: 'john',
      lastName: 'changeme',
      email: 'john@gmail.com',
      password: '1234',
    },
    {
      id: 2,
      firstName: 'maria',
      lastName: 'guess',
      email: 'maria@gmail.com',
      password: '1234',
    },
  ];

  async findOne(email: string) {
    return this.users.find((user) => user.email === email);
  }
}
