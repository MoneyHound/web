import { Component, input } from '@angular/core';

@Component({
  standalone: true,
  selector: 'mh-logo',
  templateUrl: './logo.html',
  styleUrl: './logo.scss',
})
export class MhLogo {
  readonly wordmark = input(true);
}