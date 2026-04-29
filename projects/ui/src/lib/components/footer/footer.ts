import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MhLogo } from '../logo/logo';

@Component({
  standalone: true,
  selector: 'mh-footer',
  imports: [MhLogo, RouterLink],
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
})
export class MHFooter {}