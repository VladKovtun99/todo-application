import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="d-flex align-items-center justify-content-center min-vh-100 bg-light">
      <div class="text-center">
        <h1 class="display-1 fw-bold">404</h1>
        <h2 class="fs-3">Page Not Found</h2>
        <p class="lead">The page you're looking for doesn't exist.</p>
        <a routerLink="/" class="btn btn-primary">Go Home</a>
      </div>
    </div>
  `
})
export class NotFoundComponent {}
