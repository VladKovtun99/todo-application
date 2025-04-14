import {Component, Inject, Input} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {TodoStateService} from '../../services/todo-state.service';
import {TodoModel} from '../../models/todo.model';
import {StatusesEnum} from '../../enums/StatusesEnum';

@Component({
  selector: 'app-todo-dialog',
  imports: [
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule
  ],
  templateUrl: './todo-dialog.component.html',
  styleUrl: './todo-dialog.component.css'
})
export class TodoDialogComponent {
  dialogTitle: string;
  isEditMode: boolean;
  todoForm = new FormGroup({
    title: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required)
  });

  constructor(private todoService: TodoStateService,
              private dialogRef: MatDialogRef<TodoDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: TodoModel | null
  ) {
    this.isEditMode = !!data;
    this.dialogTitle = this.isEditMode ? 'Edit Todo' : 'Add Todo';

    if (this.isEditMode && this.data) {
      this.todoForm.setValue({
        title: this.data.title,
        description: this.data.description
      });
    }
  }

  onSubmit(): void {
    if (!this.todoForm.valid) {
      return;
    }

    if (this.isEditMode && this.data) {
      const updatedTodo: TodoModel = {
        id: this.data.id,
        title: this.todoForm.controls['title'].value || '',
        description: this.todoForm.controls['description'].value || '',
        status: this.data.status
      };

      this.todoService.updateTodo(updatedTodo);
    } else {
      const newTodo: TodoModel = {
        id: Math.random(),
        title: this.todoForm.controls['title'].value || '',
        description: this.todoForm.controls['description'].value || '',
        status: StatusesEnum.NotStarted
      };

      this.todoService.addTodo(newTodo);
    }
    this.dialogRef.close();
  }
}
