import { Component, inject } from '@angular/core';
import { NgComponentOutlet, CommonModule } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';
import { PopupService } from './popup.service';

@Component({
  selector: 'mh-popup',
  imports: [CommonModule, NgComponentOutlet],
  templateUrl: './popup.html',
  styleUrl: './popup.scss',
})
export class MhPopup {
  protected readonly popupService = inject(PopupService);
  private readonly sanitizer = inject(DomSanitizer);

  safeUrl(url: string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  getIcon(type: string): string {
    switch (type) {
      case 'success':
        return 'check_circle';
      case 'error':
        return 'cancel';
      case 'warning':
        return 'warning';
      default:
        return 'info';
    }
  }

  onAction(action: (() => void) | undefined): void {
    if (action) {
      action();
    }
    this.popupService.close();
  }
}