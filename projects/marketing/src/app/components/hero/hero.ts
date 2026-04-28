import { Component, signal } from '@angular/core';
import { MhButton } from 'ui';

@Component({
  selector: 'mh-hero',
  imports: [MhButton],
  templateUrl: './hero.html',
  styleUrl: './hero.scss',
})
export class Hero {
  protected readonly dashboardUrl = signal('/dashboard');
}