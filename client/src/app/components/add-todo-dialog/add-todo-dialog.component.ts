import {Component} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {TodoStateService} from '../../services/todo-state.service';
import {TodoModel} from '../../models/todo.model';
import {StatusesEnum} from '../../enums/StatusesEnum';

@Component({
  selector: 'app-add-todo-dialog',
  imports: [
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule
  ],
  templateUrl: './add-todo-dialog.component.html',
  styleUrl: './add-todo-dialog.component.css'
})
export class AddTodoDialogComponent {
  addTodoFormGroup = new FormGroup({
    title: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required)
  });

  constructor(private todoService: TodoStateService,
              private dialogRef: MatDialogRef<AddTodoDialogComponent>) {
  }

  onSubmit(): void {
    const todo: TodoModel = {
      id: Math.random(),
      title: this.addTodoFormGroup.controls['title'].value || '',
      description: this.addTodoFormGroup.controls['description'].value || '',
      status: StatusesEnum.NotStarted
    }

    this.todoService.addTodo(todo);
    this.dialogRef.close();
  }
}
