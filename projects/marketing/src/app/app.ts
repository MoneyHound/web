import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MhToastContainer, MhPopup, MHNavbar, MHFooter } from 'ui';
@Component({
  selector: 'app-root',
  imports: [MHNavbar, MHFooter, RouterOutlet, MhToastContainer, MhPopup],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {}