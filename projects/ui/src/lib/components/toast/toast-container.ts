import { Component, inject } from '@angular/core';
import { ToastService } from './toast.service';

@Component({
  selector: 'mh-toast-container',
  imports: [],
  templateUrl: './toast-container.html',
  styleUrl: './toast-container.scss',
})
export class MhToastContainer {
  protected readonly toastService = inject(ToastService);

  getIcon(type: string): string {
    switch (type) {
      case 'success':
        return '✓';
      case 'error':
        return '✕';
      case 'warning':
        return '⚠';
      default:
        return 'ℹ';
    }
  }
}