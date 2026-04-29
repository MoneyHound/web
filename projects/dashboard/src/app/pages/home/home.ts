import { Component, inject } from '@angular/core';
import { MhButton } from 'ui';
import { AuthStore } from 'store';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [MhButton, DatePipe],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  protected readonly authStore = inject(AuthStore);
}