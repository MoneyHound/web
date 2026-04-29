import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MhToastContainer, MhPopup } from 'ui';
import { Navbar } from './components/navbar/navbar';
import { Footer } from './components/footer/footer';
@Component({
  selector: 'app-root',
  imports: [Navbar, Footer, RouterOutlet, MhToastContainer, MhPopup],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {}