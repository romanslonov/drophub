import { Module } from '@nestjs/common';
import { BoardController } from './board.controller';
import { BoardService } from './board.service';

@Module({
  imports: [],
  providers: [BoardService],
  exports: [BoardService],
  controllers: [BoardController],
})
export class BoardModule {}
