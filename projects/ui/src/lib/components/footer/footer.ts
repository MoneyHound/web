import { Component } from '@angular/core';
import { MhLogo } from '../logo/logo';

@Component({
  standalone: true,
  selector: 'mh-footer',
  imports: [MhLogo],
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
})
export class Footer {}