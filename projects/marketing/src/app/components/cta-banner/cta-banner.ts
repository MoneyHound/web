import { Component, signal } from '@angular/core';
import { MhButton } from 'ui';

@Component({
  selector: 'mh-cta-banner',
  imports: [MhButton],
  templateUrl: './cta-banner.html',
  styleUrl: './cta-banner.scss',
})
export class CtaBanner {
  protected readonly dashboardUrl = signal('/dashboard');
}