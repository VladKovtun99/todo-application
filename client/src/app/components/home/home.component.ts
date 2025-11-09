import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {AuthOptionsComponent} from '../auth-options/auth-options.component';
import {TodoListComponent} from '../todo-list/todo-list.component';
import {HeaderComponent} from '../header/header.component';
import {TodoCalendarComponent} from '../todo-calendar/todo-calendar.component';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-home',
  imports: [
    AuthOptionsComponent,
    TodoListComponent,
    HeaderComponent,
    TodoCalendarComponent
  ],
  templateUrl: './home.component.html',
  standalone: true,
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit, OnDestroy {
  authService = inject(AuthService);
  isLoggedIn = false;
  private subscriptions = new Subscription();

  ngOnInit() {
    this.subscriptions.add(
      this.authService.isAuthenticated.subscribe(isAuthenticated => {
        this.isLoggedIn = isAuthenticated;
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
