import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MhToastContainer, MhPopup } from 'ui';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MhToastContainer, MhPopup],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('dashboard');
}
