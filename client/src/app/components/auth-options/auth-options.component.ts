import { Component } from '@angular/core';
import {RouterLink, RouterLinkActive} from '@angular/router';

@Component({
  selector: 'app-auth-options',
  imports: [
    RouterLink,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './auth-options.component.html',
  standalone: true,
  styleUrl: './auth-options.component.css'
})
export class AuthOptionsComponent {

}
