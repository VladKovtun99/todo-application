import {Component, inject} from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {AuthTemporaryService} from '../../services/auth-temporary.service';

@Component({
  selector: 'app-header',
  imports: [MatToolbarModule,
    MatButtonModule,],
  templateUrl: './header.component.html',
  standalone: true,
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  authService = inject(AuthTemporaryService);

  signOut(): void {
    this.authService.removeAuth();
  }
}
