import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { BoardService } from './board.service';
import CreateBoardDto from './dto/create-board.dto';

@Controller('boards')
export class BoardController {
  constructor(private boardService: BoardService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() data: CreateBoardDto, @Request() req) {
    const board = await this.boardService.create(data, req.user);
    return board;
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(@Request() req) {
    const boards = await this.boardService.findAll(req.user);
    return boards;
  }

  @UseGuards(JwtAuthGuard)
  @Post(':id')
  async share(@Param('id') id: number, @Body() data: { userIds: number[] }) {
    const board = await this.boardService.shareWithUsers(id, data.userIds);
    return board;
  }
}
