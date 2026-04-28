import { Component, input } from '@angular/core';

@Component({
  selector: 'textarea[mh-textarea]',
  imports: [],
  template: '',
  styleUrl: './textarea.scss',
  host: {
    class: 'mh-textarea',
    '[attr.id]': 'id()',
    '[attr.rows]': 'rows()',
    '[attr.placeholder]': 'placeholder()',
    '[attr.disabled]': 'disabled() ? true : null',
  },
})
export class MhTextarea {
  readonly id = input<string>();
  readonly rows = input<number>(5);
  readonly placeholder = input<string>();
  readonly disabled = input<boolean>(false);
}