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
import {TodoCardComponent} from '../todo-card/todo-card.component';

@Component({
  selector: 'app-todo-list',
  imports: [
    CommonModule,
    MatCardModule,
    MatExpansionModule,
    MatButtonModule,
    MatIconModule,
    TodoCardComponent
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
}
