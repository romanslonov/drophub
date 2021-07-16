import { Board } from 'src/board/board.entity';
import { File } from 'src/file/file.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToMany,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ unique: true })
  email: string;

  @Column({ select: false })
  password: string;

  @OneToMany(() => Board, (board) => board.owner)
  boards: Board[];

  @OneToMany(() => File, (file) => file.author)
  files: File[];

  @ManyToMany(() => Board, (board) => board.users)
  sharedBoards: Board[];
}
