import { Component, inject, signal } from '@angular/core';
import { APP_CONFIG } from 'models';
import { MhButton } from 'ui';

@Component({
  selector: 'mh-hero',
  imports: [MhButton],
  templateUrl: './hero.html',
  styleUrl: './hero.scss',
})
export class Hero {
  private readonly config = inject(APP_CONFIG)
  protected readonly dashboardUrl = this.config.dashboardUrl;
}