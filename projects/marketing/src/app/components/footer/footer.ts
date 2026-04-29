import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MhLogo } from 'ui';

@Component({
  standalone: true,
  selector: 'mh-footer',
  imports: [MhLogo, RouterLink],
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
})
export class Footer {}