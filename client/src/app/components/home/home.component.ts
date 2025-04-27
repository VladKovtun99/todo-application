import {Component, inject} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {MatToolbar, MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {AuthOptionsComponent} from '../auth-options/auth-options.component';
import {TodoListComponent} from '../todo-list/todo-list.component';
import {HeaderComponent} from '../header/header.component';

@Component({
  selector: 'app-home',
  imports: [
    AuthOptionsComponent,
    TodoListComponent,
    HeaderComponent
  ],
  templateUrl: './home.component.html',
  standalone: true,
  styleUrl: './home.component.css'
})
export class HomeComponent {
  authService = inject(AuthService);
  isLoggedIn = false;

  ngOnInit() {
    this.authService.isAuthenticated.subscribe(isAuthenticated => {
      this.isLoggedIn = isAuthenticated;
    });
  }
}
