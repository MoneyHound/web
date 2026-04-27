import { Component, signal } from '@angular/core';

@Component({
  selector: 'mh-hero',
  imports: [],
  templateUrl: './hero.html',
  styleUrl: './hero.scss',
})
export class Hero {
  protected readonly dashboardUrl = signal('/dashboard');
}