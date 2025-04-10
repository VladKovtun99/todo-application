import { Component } from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';
import {AuthOptionsComponent} from './components/auth-options/auth-options.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, AuthOptionsComponent, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'client';
}
