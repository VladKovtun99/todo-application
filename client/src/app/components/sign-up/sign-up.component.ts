import {Component, inject} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Router, RouterLink} from '@angular/router';
import {AuthService} from '../../services/auth.service';
import {RegisterDto} from '../../models/register.dto';
import {NgClass, NgIf} from '@angular/common';

@Component({
  selector: 'app-sign-up',
  imports: [ReactiveFormsModule, RouterLink, NgClass, NgIf],
  standalone: true,
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent {
  signupForm = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', Validators.required)
  })
  authService = inject(AuthService);
  router = inject(Router);

  errorMessage: string | null = null;
  submitted = false;
  isSubmitting = false;

  get formControls() {
    return this.signupForm.controls;
  }

  onSubmit(): void {
    this.submitted = true;
    this.errorMessage = null;
    if (this.signupForm.invalid) {
      return;
    }
    this.isSubmitting = true;
    const registerDto: RegisterDto = {
      name: this.signupForm.value.name || '',
      email: this.signupForm.value.email || '',
      password: this.signupForm.value.password || ''
    }

    this.authService.register(registerDto).subscribe({
      next: (response) => {
        this.isSubmitting = false;
        if (response.access && response.refresh) {
          localStorage.setItem('accessToken', response.access);

          this.router.navigate(['/']);
        }
      },
      error: (error) => {
        this.isSubmitting = false;
        if (error.error['error']) {
          console.log(error.error['error']);
          this.errorMessage = error.error['error'];
        } else {
          console.error('Registration failed:', error);
          this.errorMessage = 'Registration failed.';
        }
      }
    });
  }
}
