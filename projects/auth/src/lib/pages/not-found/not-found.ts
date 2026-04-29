import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { MhButton } from 'ui';

@Component({
  selector: 'auth-not-found',
  imports: [MhButton],
  templateUrl: './not-found.html',
  styleUrl: './not-found.scss',
})
export class NotFound {
  private readonly router = inject(Router);

  goHome(): void {
    this.router.navigate(['/']);
  }
}