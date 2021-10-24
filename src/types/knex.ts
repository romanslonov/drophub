import { knex } from 'knex';

export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
}

export interface Board {
  id: number;
  name: string;
  ownerId?: number;

  owner?: Pick<User, 'id' | 'email' | 'name'>;
}

export interface File {
  id: number;
  key: string;
  name: string;
  size: number;
  ownerId?: number;
  boardId?: number;

  owner?: Pick<User, 'id' | 'email' | 'name'>;
}

declare module 'knex/types/tables' {
  interface Tables {
    // This is same as specifying `knex<User>('users')`
    users: User;
    boards: Board;
    files: File;
  }
}
