import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NgClass} from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {TodoModel} from '../../models/todo.model';

@Component({
    selector: 'app-status-selector',
    imports: [MatMenuModule,
        MatIconModule,
        NgClass],
    templateUrl: './status-selector.component.html',
    standalone: true,
    styleUrl: './status-selector.component.css'
})
export class StatusSelectorComponent {
  @Input() todo!: TodoModel;
  @Output() statusChanged = new EventEmitter<{todo: TodoModel, newStatus: number}>();

  updateStatus(newStatus: number): void {
    this.statusChanged.emit({todo: this.todo, newStatus});
  }
}
