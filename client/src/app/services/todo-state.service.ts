import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {TodoModel} from '../models/todo.model';

const STORAGE_KEY = 'todos';

@Injectable({providedIn: 'root'})
export class TodoStateService {
  private todoSubject = new BehaviorSubject<TodoModel[]>(this.loadTodos());
  todos$ = this.todoSubject.asObservable();

  private loadTodos(): TodoModel[] {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  }

  private saveTodos(todos: TodoModel[]): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  }

  getTodos(): TodoModel[] {
    return this.todoSubject.getValue();
  }

  addTodo(todo: TodoModel): void {
    const updated = [...this.todoSubject.value, todo];
    this.todoSubject.next(updated);
    this.saveTodos(updated);
  }

  deleteTodo(id: number): void {
    const updated = this.todoSubject.value.filter(t => t.id !== id);
    this.todoSubject.next(updated);
    this.saveTodos(updated);
  }

  updateTodo(updatedTodo: TodoModel): void {
    const updated = this.todoSubject.value.map(todo =>
      todo.id === updatedTodo.id ? {...todo, ...updatedTodo} : todo
    );

    this.todoSubject.next(updated);
    this.saveTodos(updated);
  }

  clearTodos() {
    const updated: TodoModel[] = []
    this.todoSubject.next(updated)
    this.saveTodos(updated);
  }
}

