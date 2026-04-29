import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar, Footer, MhToastContainer, MhPopup } from 'ui';

@Component({
  selector: 'app-root',
  imports: [Navbar, RouterOutlet, Footer, MhToastContainer, MhPopup],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {}