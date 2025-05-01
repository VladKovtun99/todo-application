import {Component, inject, Inject, Input} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {TodoStateService} from '../../services/todo-state.service';
import {TodoModel} from '../../models/todo.model';
import {StatusesEnum} from '../../enums/StatusesEnum';
import {GoogleCalendarService} from '../../services/google-calendar.service';
import {MatDatepicker, MatDatepickerInput, MatDatepickerToggle} from '@angular/material/datepicker';
import {ConsoleLogger} from '@angular/compiler-cli';
import {MatCheckbox} from '@angular/material/checkbox';

@Component({
  selector: 'app-todo-dialog',
  imports: [
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatDatepickerToggle,
    MatDatepickerInput,
    MatDatepicker,
    MatCheckbox
  ],
  templateUrl: './todo-dialog.component.html',
  standalone: true,
  styleUrl: './todo-dialog.component.css'
})
export class TodoDialogComponent {
  dialogTitle: string;
  isEditMode: boolean;
  todoForm = new FormGroup({
    title: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    deadline: new FormControl(new Date()),
    addToCalendar: new FormControl(false)
  });
  todoService = inject(TodoStateService);
  googleCalendarService = inject(GoogleCalendarService);
  dialogRef =  inject(MatDialogRef<TodoDialogComponent>);

  constructor(@Inject(MAT_DIALOG_DATA) public data: TodoModel | null) {
    this.isEditMode = !!data;
    this.dialogTitle = this.isEditMode ? 'Edit Todo' : 'Add Todo';

    if (this.isEditMode && this.data) {
      const deadlineDate = this.data.deadline ? new Date(this.data.deadline) : new Date();

      this.todoForm.setValue({
        title: this.data.title,
        description: this.data.description,
        deadline: deadlineDate,
        addToCalendar: false
      });
    }
  }

  async onSubmit(): Promise<void> {
    if (!this.todoForm.valid) {
      return;
    }

    const deadlineDate: Date = this.todoForm.controls['deadline'].value as Date;
    if (this.isEditMode && this.data) {
      const updatedTodo = {
        id: this.data.id,
        title: this.todoForm.controls['title'].value || '',
        description: this.todoForm.controls['description'].value || '',
        status: this.data.status,
        deadline: deadlineDate
      };

      this.todoService.updateTodo(updatedTodo);
    } else {
      const newTodo: TodoModel = {
        id: null,
        title: this.todoForm.controls['title'].value || '',
        description: this.todoForm.controls['description'].value || '',
        status: StatusesEnum.NotStarted,
        deadline: deadlineDate
      };
      this.todoService.addTodo(newTodo);

      if (this.todoForm.controls['addToCalendar'].value) {
        try {
          const eventLink = await this.googleCalendarService.createEvent({
            summary: newTodo.title,
            description: newTodo.description,
            email: "goze23gooz@gmail.com",
            startTime: deadlineDate.toISOString(),
            endTime: deadlineDate.toISOString()
          });

          console.log("Event created with URL:", eventLink);
        } catch (error) {
          console.error("Failed to create Google Calendar event:", error);
        }
      }
    }
    this.dialogRef.close();
  }
}
