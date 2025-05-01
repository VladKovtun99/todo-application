import {Component, inject} from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {AuthService} from '../../services/auth.service';
import {TodoStateService} from '../../services/todo-state.service';

@Component({
  selector: 'app-header',
  imports: [MatToolbarModule,
    MatButtonModule,],
  templateUrl: './header.component.html',
  standalone: true,
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  authService = inject(AuthService);
  todoService = inject(TodoStateService);

  signOut(): void {
    this.todoService.clearSubject();
    this.authService.logout();
  }
}
