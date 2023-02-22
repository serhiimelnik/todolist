import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
// import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todo } from './entities/todo.entity';

@Injectable()
export class TodosService {
  private id: number = 0;
  private todos: Todo[] = [];

  create(user_id: number, createTodoDto: CreateTodoDto) {
    this.id++;
    const todo = new Todo(this.id, createTodoDto.name, "new", user_id);
    this.todos.push(todo);

    return todo;
  }

  findAll(user_id: number) {
    return this.todos.filter(t => {return t.user_id === user_id});
  }

  findOne(user_id: number, id: number) {
    const todo = this.todos.find(t => t.id === id && t.user_id === user_id);
    if (!todo) {
      throw new NotFoundException();
    }

    return todo;
  }

  update(user_id: number, id: number) {
    this.findOne(user_id, id);
    const index = this.todos.findIndex(t => t.id === id);
    this.todos[index].status = "done";

    return this.todos[index];
  }

  remove(user_id: number, id: number) {
    this.findOne(user_id, id);
    const index = this.todos.findIndex(t => t.id === id);
    this.todos.splice(index, 1);

    return null;
  }
}
