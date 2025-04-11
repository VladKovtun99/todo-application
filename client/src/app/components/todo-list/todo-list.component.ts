import {Component, inject} from '@angular/core';
import {TodoModel} from '../../models/todo.model';
import {HttpClient} from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-todo-list',
  imports: [
    CommonModule,
    MatCardModule,
    MatExpansionModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.css'
})
export class TodoListComponent {
  todos: TodoModel[] = [];
  private http = inject(HttpClient);


  ngOnInit(): void {
    this.http.get<TodoModel[]>('todos.json').subscribe(data => {
      this.todos = data;
    });
  }
}
