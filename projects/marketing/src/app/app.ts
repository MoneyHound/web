import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar, Footer, MhToastContainer } from 'ui';

@Component({
  selector: 'app-root',
  imports: [Navbar, RouterOutlet, Footer, MhToastContainer],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {}