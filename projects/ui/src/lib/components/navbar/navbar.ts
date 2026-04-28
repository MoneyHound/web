import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MhButton } from '../button/button';
import { MhLogo } from '../logo/logo';

@Component({
  standalone: true,
  selector: 'mh-navbar',
  imports: [MhLogo, MhButton, RouterLink],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar {
  protected readonly dashboardUrl = signal('/dashboard');
}