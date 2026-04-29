import { Component, inject } from '@angular/core';
import { AuthStore } from 'store';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [DatePipe],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  protected readonly authStore = inject(AuthStore);
}