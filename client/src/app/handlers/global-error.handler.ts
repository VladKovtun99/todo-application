import {ErrorHandler, inject, Injectable, isDevMode} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {HttpErrorResponse} from '@angular/common/http';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  private readonly snackBar = inject(MatSnackBar);

  handleError(error: unknown): void {
    const message = this.extractMessage(error);

    this.snackBar.open(message, 'Dismiss', {
      duration: 5000,
      panelClass: ['error-snackbar'],
      horizontalPosition: 'end',
      verticalPosition: 'top'
    });

    if (isDevMode()) {
      console.error(error);
    }
  }

  private extractMessage(error: unknown): string {
    if (error instanceof HttpErrorResponse) {
      if (typeof error.error === 'string' && error.error.trim().length > 0) {
        return error.error;
      }
      if (error.error?.message) {
        return error.error.message;
      }
      return `Request failed (${error.status || 'unknown status'})`;
    }

    if (error instanceof Error && error.message) {
      return error.message;
    }

    return 'An unexpected error occurred. Please try again.';
  }
}

