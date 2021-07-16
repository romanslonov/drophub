// id int(11) NOT NULL AUTO_INCREMENT,
// userId int(11) NOT NULL,
// boardId int(11) NOT NULL,
// name varchar(255) NOT NULL,
// bucket varchar(255) NOT NULL,
// etag varchar(255) NOT NULL,
// size varchar(255) NOT NULL,
// mimeType varchar(255) NOT NULL,
// url varchar(255) NOT NULL,
// thumbnail varchar(255) NOT NULL,
// `key` varchar(255) NOT NULL,
// uploadedAt datetime DEFAULT CURRENT_TIMESTAMP,
// deletedAt datetime NULL,
// PRIMARY KEY (id),
// FOREIGN KEY (userId) REFERENCES users(id),
// FOREIGN KEY (boardId) REFERENCES boards(id)

import { Board } from 'src/board/board.entity';
import { User } from 'src/users/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  DeleteDateColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';

@Entity()
export class File {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @CreateDateColumn()
  uploadedAt: string;

  @DeleteDateColumn()
  deletedAt: string;

  @ManyToOne(() => Board, (board) => board.files)
  board: Board;

  @ManyToOne(() => User, (user) => user.files)
  author: User;
}
