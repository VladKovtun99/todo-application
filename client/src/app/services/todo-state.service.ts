import {inject, Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {TodoModel} from '../models/todo.model';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

const STORAGE_KEY = 'todos';

@Injectable({providedIn: 'root'})
export class TodoStateService {
  private todoSubject = new BehaviorSubject<TodoModel[]>([]);
  todos$ = this.todoSubject.asObservable();
  http = inject(HttpClient);
  todosUrl = environment.apiUrl + '/todos/';

  loadTodosIfEmpty(): void {
    if (this.todoSubject.value.length === 0) {
      this.http.get<TodoModel[]>(this.todosUrl).subscribe(todos => {
        this.todoSubject.next(todos);
      });
    }
  }

  addTodo(todo: TodoModel): void {
    this.http.post<TodoModel>(this.todosUrl, todo).subscribe(newTodo => {
      const updated = [...this.todoSubject.value, newTodo];
      this.todoSubject.next(updated);
    });
  }

  deleteTodo(id: number): void {
    this.http.delete(`${this.todosUrl}${id}/`).subscribe(() => {
      const updated = this.todoSubject.value.filter(t => t.id !== id);
      this.todoSubject.next(updated);
    });
  }

  updateTodo(updatedTodo: TodoModel): void {
    this.http.put<TodoModel>(`${this.todosUrl}${updatedTodo.id}/`, updatedTodo).subscribe(res => {
      const updated = this.todoSubject.value.map(todo =>
        todo.id === updatedTodo.id ? res : todo
      );
      this.todoSubject.next(updated);
    });
  }

  clearTodos() {
    this.http.delete<TodoModel[]>(`${this.todosUrl}`).subscribe(res => {
      const updated: TodoModel[] = []
      this.todoSubject.next(updated)
    })
  }

  clearSubject() {
    const updated: TodoModel[] = []
    this.todoSubject.next(updated)
  }
}

