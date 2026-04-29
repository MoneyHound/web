import { Component, signal } from '@angular/core';

@Component({
  selector: 'mh-features',
  imports: [],
  templateUrl: './features.html',
  styleUrl: './features.scss',
})
export class Features {
  protected readonly features = signal([
    {
      icon: 'storage',
      title: 'Simulation Datasets',
      description:
        'Generate thousands of realistic transactions with configurable fraud rates, AML typologies, and jurisdiction rules.',
    },
    {
      icon: 'monitor_heart',
      title: 'Anomaly Signals',
      description:
        'Built-in behavioral scoring flags structuring, mule networks, and unusual patterns — scored 0.00 to 1.00.',
    },
    {
      icon: 'security',
      title: 'Regulatory Compliance',
      description:
        'Validate your detection systems against CTR thresholds, KYC risk tiers, and jurisdiction-specific AML rules.',
    },
  ]);
}