import { Component, input } from '@angular/core';

@Component({
  selector: 'a[mh-button], button[mh-button]',
  imports: [],
  templateUrl: './button.html',
  styleUrl: './button.scss',
  host: {
    '[class]': '"mh-button mh-button--" + variant() + " mh-button--" + size()',
  },
})
export class MhButton {
  readonly variant = input<'primary' | 'secondary' | 'danger' | 'ghost'>('primary');
  readonly size = input<'sm' | 'default' | 'lg'>('default');
}