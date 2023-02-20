import { EnvironmentInjector } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Todo, TodosState } from './todos.state';

describe('TodosState', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [TodosState],
    });
  });

  it('initial state', (done) => {
    const state = TestBed.inject(EnvironmentInjector).get(TodosState);

    state.state$.subscribe(({ todos }) => {
      expect(todos).toEqual({});
      done();
    });
  });

  it('add todo', (done) => {
    const state = TestBed.inject(EnvironmentInjector).get(TodosState);

    const todo = state.add('something');

    state.state$.subscribe(({ todos }) => {
      expect(todos.get(todo.id)).toEqual(todo);
      expect(todos.get(todo.id)?.name).toEqual('something');
      done();
    });
  });

  it('update todo', (done) => {
    const state = TestBed.inject(EnvironmentInjector).get(TodosState);

    const todo = state.add('learn tests');

    state.updateTodo(todo.id, {
      name: 'learn unit tests',
    });

    state.state$.subscribe(({ todos }) => {
      const expected = todos.get(todo.id) as Todo;
      expect(expected.name).toEqual('learn unit tests');
      done();
    });
  });

  it('failed update', () => {
    // todo
  });
});
