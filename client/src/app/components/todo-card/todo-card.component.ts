import {Component, Input} from '@angular/core';
import {TodoModel} from '../../models/todo.model';
import {
  MatExpansionPanel,
  MatExpansionPanelActionRow,
  MatExpansionPanelDescription,
  MatExpansionPanelHeader, MatExpansionPanelTitle
} from '@angular/material/expansion';
import {StatusSelectorComponent} from '../status-selector/status-selector.component';
import {MatButton} from '@angular/material/button';
import {TodoStateService} from '../../services/todo-state.service';
import {StatusesEnum} from '../../enums/StatusesEnum';
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-todo-card',
  imports: [
    MatButton,
    MatExpansionPanel,
    MatExpansionPanelActionRow,
    MatExpansionPanelDescription,
    MatExpansionPanelHeader,
    MatExpansionPanelTitle,
    StatusSelectorComponent,
    NgClass
  ],
  templateUrl: './todo-card.component.html',
  styleUrl: './todo-card.component.css'
})
export class TodoCardComponent {
  @Input() todo!: TodoModel;

  constructor(private todoService: TodoStateService) {
  }

  deleteTodo(id: number): void {
    this.todoService.deleteTodo(id)
  }

  markAsComplete(id: number): void {
    if (this.todo.status !== StatusesEnum.Done) {
      const updatedTodo = { ...this.todo, status: StatusesEnum.Done };
      this.todoService.updateTodo(updatedTodo);
    }
  }

  handleStatusChange(event: { todo: TodoModel, newStatus: number }): void {
    const updatedTodo = {...event.todo, status: event.newStatus};
    this.todoService.updateTodo(updatedTodo);
  }
}
