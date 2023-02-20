import { inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AlertService } from './alert.service';

export interface Todo {
  id: string;
  name: string;
  status: 'todo' | 'inprogress' | 'done';
}

interface State {
  todos: Map<string, Todo>;
}

function genId() {
  return Math.random().toString().slice(2);
}

@Injectable()
export class TodosState {
  private alertService = inject(AlertService);
  private state$$ = new BehaviorSubject<State>({
    todos: new Map<string, Todo>(),
  });

  constructor() {}

  get state$() {
    return this.state$$.asObservable();
  }

  private get todos() {
    return this.state$$.value.todos;
  }

  add(name: string) {
    const todo: Todo = {
      id: genId(),
      name,
      status: 'todo',
    };

    this.state$$.next({
      todos: new Map(this.todos).set(todo.id, todo),
    });

    return todo;
  }

  updateTodo(todoId: string, todoUpdate: Partial<Omit<Todo, 'id'>>) {
    const storedTodo = this.todos.get(todoId);

    if (!storedTodo) {
      this.alertService.error(`Nie mam todo o id ${todoId}`);
      return;
    }

    const { id, ...todo } = storedTodo;

    this.state$$.next({
      todos: new Map(this.todos).set(todoId, { id: todoId, ...todo, ...todoUpdate }),
    });
  }
}
