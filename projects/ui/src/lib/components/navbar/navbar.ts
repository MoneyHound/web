import { Component, signal } from '@angular/core';
import { MhLogo } from '../logo/logo';

@Component({
  standalone: true,
  selector: 'mh-navbar',
  imports: [MhLogo],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar {
  protected readonly dashboardUrl = signal('/dashboard');
}