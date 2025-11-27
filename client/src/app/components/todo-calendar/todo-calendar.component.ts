import { Component, OnDestroy, OnInit } from '@angular/core';
import { TodoStateService } from '../../services/todo-state.service';
import { TodoModel } from '../../models/todo.model';
import {MatTooltip} from '@angular/material/tooltip';
import {MatCard, MatCardContent, MatCardHeader, MatCardTitle} from '@angular/material/card';
import {MatIconButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {Subscription} from 'rxjs';

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
    MatIconButton,
    MatIcon
  ]
})
export class TodoCalendarComponent implements OnInit, OnDestroy {
  calendarDays: CalendarDay[] = [];
  weekDays: string[] = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  currentMonth: Date = new Date();
  monthYearStr: string = '';
  private subscriptions = new Subscription();
  private todos: TodoModel[] = [];

  constructor(private todoService: TodoStateService) {}

  ngOnInit(): void {
    this.todoService.loadTodosIfEmpty();
    this.generateCalendarStructure();
    this.updateMonthYearStr();
    this.subscriptions.add(
      this.todoService.todos$.subscribe(todos => {
        this.todos = todos;
        this.populateCalendarWithTodos(todos);
      })
    );
  }

  updateMonthYearStr(): void {
    this.monthYearStr = this.currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' });
  }

  private generateCalendarStructure(): void {
    const firstDayOfMonth = new Date(this.currentMonth.getFullYear(), this.currentMonth.getMonth(), 1);
    const startingDayOfWeek = firstDayOfMonth.getDay();

    const firstDay = new Date(firstDayOfMonth);
    firstDay.setDate(firstDay.getDate() - startingDayOfWeek);

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    this.calendarDays = [];

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
  }

  private populateCalendarWithTodos(todos: TodoModel[]): void {
    this.generateCalendarStructure();

    this.calendarDays.forEach(day => {
      day.todos = [];
    });

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
  }

  getTodoStatusClass(status: number): string {
    switch (status) {
      case 1: return 'todo-pending';
      case 2: return 'todo-in-progress';
      case 3: return 'todo-completed';
      default: return '';
    }
  }

  previousMonth(): void {
    this.currentMonth = new Date(this.currentMonth.getFullYear(), this.currentMonth.getMonth() - 1, 1);
    this.updateMonthYearStr();
    this.populateCalendarWithTodos(this.todos);
  }

  nextMonth(): void {
    this.currentMonth = new Date(this.currentMonth.getFullYear(), this.currentMonth.getMonth() + 1, 1);
    this.updateMonthYearStr();
    this.populateCalendarWithTodos(this.todos);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
