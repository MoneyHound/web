import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { APP_CONFIG } from 'models';
import { MhButton, MhLogo } from 'ui';

@Component({
  standalone: true,
  selector: 'mh-navbar',
  imports: [MhLogo, MhButton, RouterLink],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class MHNavbar {
  private readonly config = inject(APP_CONFIG)
  protected readonly dashboardUrl = this.config.dashboardUrl;
}