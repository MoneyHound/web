import { Component, signal } from '@angular/core';

@Component({
  selector: 'mh-cta-banner',
  imports: [],
  templateUrl: './cta-banner.html',
  styleUrl: './cta-banner.scss',
})
export class CtaBanner {
  protected readonly dashboardUrl = signal('/dashboard');
}