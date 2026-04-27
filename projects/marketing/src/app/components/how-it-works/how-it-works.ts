import { Component, signal } from '@angular/core';

@Component({
  selector: 'mh-how-it-works',
  imports: [],
  templateUrl: './how-it-works.html',
  styleUrl: './how-it-works.scss',
})
export class HowItWorks {
  protected readonly steps = signal([
    {
      number: '1',
      title: 'Sign up in seconds',
      description: 'Create your account with just an email. No credit card required.',
    },
    {
      number: '2',
      title: 'Configure parameters',
      description: 'Set fraud rates, AML typologies, jurisdictions, and transaction volumes.',
    },
    {
      number: '3',
      title: 'Generate & validate',
      description: 'Download production-grade datasets and test your compliance systems.',
    },
  ]);
}