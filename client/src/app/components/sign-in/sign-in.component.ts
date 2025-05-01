import {Component, inject} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Router, RouterLink} from '@angular/router';
import {AuthService} from '../../services/auth.service';
import {LoginDto} from '../../models/login.dto';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-sign-in',
  imports: [
    ReactiveFormsModule,
    RouterLink,
    NgIf
  ],
  standalone: true,
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})
export class SignInComponent {
  signinForm = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  })
  authService = inject(AuthService);
  router = inject(Router);
  errorMessage: string | null = null;

  onSubmit(): void {
    const loginDto: LoginDto = {
      email: this.signinForm.value.email || '',
      password: this.signinForm.value.password || ''
    }

    this.authService.login(loginDto).subscribe({
        next: (response) => {
          if (response.access && response.refresh) {
            localStorage.setItem('accessToken', response.access);

            this.router.navigate(['/']);
          }
        },
        error: (error) => {
          if (error.error['error']) {
            console.log(error.error['error']);
            this.errorMessage = error.error['error'];
          }
          else{
            this.errorMessage = error.error.email[0];
          }
        }
      }
    )
  }
}
