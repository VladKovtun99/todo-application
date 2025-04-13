import {Component, OnInit} from '@angular/core';
import {TodoModel} from '../../models/todo.model';
import {CommonModule} from '@angular/common';
import {MatCardModule} from '@angular/material/card';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {TodoStateService} from '../../services/todo-state.service';
import {MatDialog} from '@angular/material/dialog';
import {AddTodoDialogComponent} from '../add-todo-dialog/add-todo-dialog.component';
import {StatusesEnum} from '../../enums/StatusesEnum';
import {StatusSelectorComponent} from '../status-selector/status-selector.component';

@Component({
  selector: 'app-todo-list',
  imports: [
    CommonModule,
    MatCardModule,
    MatExpansionModule,
    MatButtonModule,
    MatIconModule,
    StatusSelectorComponent
  ],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.css'
})
export class TodoListComponent implements OnInit {
  todos: TodoModel[] = [];

  constructor(private todoService: TodoStateService, private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.todoService.todos$.subscribe(todos => {
      this.todos = todos;
    });
  }

  addTodo(): void {
    this.dialog.open(AddTodoDialogComponent, {
      width: '500px',
      disableClose: true,
      backdropClass: 'dialog-backdrop'
    });
  }

  deleteTodo(id: number): void {
    this.todoService.deleteTodo(id)
  }

  markAsComplete(id: number): void {
    const todo = this.todos.find(todo => todo.id == id);

    if (todo) {
      todo.status = StatusesEnum.Done;
      this.todoService.updateTodo(todo);
    }
  }

  handleStatusChange(event: { todo: TodoModel, newStatus: number }): void {
    const updatedTodo = {...event.todo, status: event.newStatus};
    this.todoService.updateTodo(updatedTodo);
  }
}
