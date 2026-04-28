import { Component, signal } from '@angular/core';

@Component({
  selector: 'mh-about',
  imports: [],
  templateUrl: './about.html',
  styleUrl: './about.scss',
})
export class About {
  protected readonly values = signal([
    {
      icon: 'precision',
      title: 'Precise',
      description:
        'Every signal earns its place. Decorative noise dilutes insight — if it doesn\'t communicate something, we remove it.',
    },
    {
      icon: 'trust',
      title: 'Trustworthy',
      description:
        'Consistent, auditable, and built for the teams who guard financial systems. Trust is earned through reliability.',
    },
    {
      icon: 'speed',
      title: 'Fast to Understand',
      description:
        'A compliance officer must find the most important number on a screen within seconds. Hierarchy always wins.',
    },
  ]);
}