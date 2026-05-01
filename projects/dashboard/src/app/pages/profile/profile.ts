import { Component, inject } from '@angular/core';
import { AuthStore } from 'store';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-profile',
  imports: [DatePipe],
  templateUrl: './profile.html',
  styleUrl: './profile.scss',
})
export class Profile {
  protected readonly authStore = inject(AuthStore);
}