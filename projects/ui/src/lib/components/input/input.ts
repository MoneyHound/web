import { Component, input } from '@angular/core';

@Component({
  selector: 'input[mh-input]',
  imports: [],
  template: '',
  styleUrl: './input.scss',
  host: {
    class: 'mh-input',
    '[attr.type]': 'type()',
    '[attr.id]': 'id()',
    '[attr.placeholder]': 'placeholder()',
    '[attr.disabled]': 'disabled() ? true : null',
  },
})
export class MhInput {
  readonly type = input<'text' | 'email' | 'password' | 'number'>('text');
  readonly id = input<string>();
  readonly placeholder = input<string>();
  readonly disabled = input<boolean>(false);
}