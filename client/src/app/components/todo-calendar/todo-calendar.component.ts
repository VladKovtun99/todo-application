import { Component, OnInit } from '@angular/core';
import { TodoStateService } from '../../services/todo-state.service';
import { TodoModel } from '../../models/todo.model';
import {MatTooltip} from '@angular/material/tooltip';
import {MatCard, MatCardContent, MatCardHeader, MatCardSubtitle, MatCardTitle} from '@angular/material/card';

interface CalendarDay {
  date: Date;
  isCurrentMonth: boolean;
  isToday: boolean;
  todos: TodoModel[];
}

@Component({
  selector: 'app-todo-calendar',
  templateUrl: './todo-calendar.component.html',
  styleUrls: ['./todo-calendar.component.css'],
  standalone: true,
  imports: [
    MatTooltip,
    MatCard,
    MatCardHeader,
    MatCardContent,
    MatCardTitle,
    MatCardSubtitle
  ]
})
export class TodoCalendarComponent implements OnInit {
  calendarDays: CalendarDay[] = [];
  weekDays: string[] = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  currentMonth: Date = new Date();
  monthYearStr: string = '';

  constructor(private todoService: TodoStateService) {}

  ngOnInit(): void {
    this.todoService.loadTodosIfEmpty();
    this.generateCalendarDays();
    this.updateMonthYearStr();

    this.todoService.todos$.subscribe(() => {
      this.generateCalendarDays();
    });
  }

  updateMonthYearStr(): void {
    this.monthYearStr = this.currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' });
  }

  generateCalendarDays(): void {
    const firstDayOfMonth = new Date(this.currentMonth.getFullYear(), this.currentMonth.getMonth(), 1);
    const lastDayOfMonth = new Date(this.currentMonth.getFullYear(), this.currentMonth.getMonth() + 1, 0);

    const startingDayOfWeek = firstDayOfMonth.getDay();

    // Get the first day to display (might be from previous month)
    const firstDay = new Date(firstDayOfMonth);
    firstDay.setDate(firstDay.getDate() - startingDayOfWeek);

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    this.calendarDays = [];

    // Generate days for the calendar (42 days to cover all possible month layouts)
    for (let i = 0; i < 42; i++) {
      const currentDate = new Date(firstDay);
      currentDate.setDate(currentDate.getDate() + i);

      const isCurrentMonth = currentDate.getMonth() === this.currentMonth.getMonth();
      const isToday = currentDate.getTime() === today.getTime();

      this.calendarDays.push({
        date: currentDate,
        isCurrentMonth,
        isToday,
        todos: []
      });
    }

    // Assign todos to calendar days
    this.todoService.todos$.subscribe(todos => {
      // Reset todos on all days
      this.calendarDays.forEach(day => {
        day.todos = [];
      });

      // Assign todos to days
      todos.forEach(todo => {
        if (todo.deadline) {
          const deadlineDate = new Date(todo.deadline);
          deadlineDate.setHours(0, 0, 0, 0);

          const dayIndex = this.calendarDays.findIndex(day =>
            day.date.getFullYear() === deadlineDate.getFullYear() &&
            day.date.getMonth() === deadlineDate.getMonth() &&
            day.date.getDate() === deadlineDate.getDate()
          );

          if (dayIndex !== -1) {
            this.calendarDays[dayIndex].todos.push(todo);
          }
        }
      });
    });
  }

  getTodoStatusClass(status: number): string {
    switch (status) {
      case 1: return 'todo-pending';
      case 2: return 'todo-in-progress';
      case 3: return 'todo-completed';
      default: return '';
    }
  }
}
