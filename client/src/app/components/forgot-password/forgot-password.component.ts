import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    RouterLink
  ],
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);

  forgotPasswordForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]]
  });

  isSubmitting = false;
  errorMessage: string | null = null;
  successMessage: string | null = null;

  async onSubmit() {
    if (this.forgotPasswordForm.invalid) {
      return;
    }

    this.isSubmitting = true;
    this.errorMessage = null;
    this.successMessage = null;

    const email = this.forgotPasswordForm.get('email')?.value;

    this.authService.forgotPassword(email)
      .subscribe({
        next: (response) => {
          this.successMessage = response.message;
        },
        error: (error) => {
          this.isSubmitting = false;
          this.errorMessage = error.error?.error || 'Failed to process password reset request';
        },
        complete: () => {
          this.isSubmitting = false;
        }
      });
  }
}

