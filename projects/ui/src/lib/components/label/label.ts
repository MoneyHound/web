import { Component, input } from '@angular/core';

@Component({
  selector: 'label[mh-label]',
  imports: [],
  template: '<ng-content />',
  styleUrl: './label.scss',
  host: {
    class: 'mh-label',
    '[attr.for]': 'for()',
  },
})
export class MhLabel {
  readonly for = input.required<string>();
}