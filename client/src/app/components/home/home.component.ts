import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {AuthOptionsComponent} from '../auth-options/auth-options.component';
import {AuthTemporaryService} from '../../services/auth-temporary.service';

@Component({
  selector: 'app-home',
  imports: [AuthOptionsComponent],
  templateUrl: './home.component.html',
  standalone: true,
  styleUrl: './home.component.css'
})
export class HomeComponent {
  constructor(protected authService: AuthTemporaryService) {
  }

  signOut(): void {
    this.authService.removeAuth();
  }
}
