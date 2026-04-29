import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MhToastContainer, MhPopup, MHFooter, MHNavbar } from 'ui';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MhToastContainer, MhPopup, MHFooter, MHNavbar],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('dashboard');
}
