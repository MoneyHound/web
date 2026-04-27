import { Component } from '@angular/core';
import { Navbar, Footer } from 'ui';
import { Hero } from './components/hero/hero';
import { Features } from './components/features/features';
import { HowItWorks } from './components/how-it-works/how-it-works';
import { CtaBanner } from './components/cta-banner/cta-banner';

@Component({
  selector: 'app-root',
  imports: [Navbar, Hero, Features, HowItWorks, CtaBanner, Footer],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {}