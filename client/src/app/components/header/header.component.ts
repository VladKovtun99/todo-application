import {Component} from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {AuthTemporaryService} from '../../services/auth-temporary.service';

@Component({
  selector: 'app-header',
  imports: [MatToolbarModule,
    MatButtonModule,],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  constructor(protected authService: AuthTemporaryService) {
  }

  signOut(): void {
    this.authService.removeAuth();
  }
}
