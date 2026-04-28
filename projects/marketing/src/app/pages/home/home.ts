import { Component } from '@angular/core';
import { Hero } from '../../components/hero/hero';
import { Features } from '../../components/features/features';
import { HowItWorks } from '../../components/how-it-works/how-it-works';
import { CtaBanner } from '../../components/cta-banner/cta-banner';

@Component({
  selector: 'mh-home',
  imports: [Hero, Features, HowItWorks, CtaBanner],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {}