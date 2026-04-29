import { Component, inject, signal } from '@angular/core';
import { APP_CONFIG } from 'models';
import { MhButton } from 'ui';

@Component({
  selector: 'mh-cta-banner',
  imports: [MhButton],
  templateUrl: './cta-banner.html',
  styleUrl: './cta-banner.scss',
})
export class CtaBanner {
  private readonly config = inject(APP_CONFIG)
  protected readonly dashboardUrl = this.config.dashboardUrl;
}