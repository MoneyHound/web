import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MHFooter, MHNavbar, MhToastContainer, MhPopup } from 'ui';

@Component({
  selector: 'app-root',
  imports: [MHFooter, MHNavbar, RouterOutlet, MhToastContainer, MhPopup],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {}