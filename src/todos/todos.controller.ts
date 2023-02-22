import { Controller, UseGuards, UsePipes, ValidationPipe, Get, Post, Request, Body, Patch, Param, Delete } from '@nestjs/common';
import { JwtAuthGuard } from '../users/guards/jwt.guard';
import { TodosService } from './todos.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { TodoDto } from './dto/todo.dto';

@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) { }

  @UseGuards(JwtAuthGuard)
  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  create(@Request() req, @Body() createTodoDto: CreateTodoDto) {
    return this.todosService.create(req.user.id, createTodoDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@Request() req) {
    return this.todosService.findAll(req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  @UsePipes(new ValidationPipe({ transform: true }))
  findOne(@Request() req, @Param() todoDto: TodoDto) {
    return this.todosService.findOne(req.user.id, +todoDto.id)
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  @UsePipes(new ValidationPipe({ transform: true }))
  update(@Request() req, @Param() todoDto: TodoDto) {
    return this.todosService.update(req.user.id, +todoDto.id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @UsePipes(new ValidationPipe({ transform: true }))
  remove(@Request() req, @Param() todoDto: TodoDto) {
    return this.todosService.remove(req.user.id, +todoDto.id);
  }
}
