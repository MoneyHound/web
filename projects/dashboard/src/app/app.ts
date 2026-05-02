import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MhToastContainer, MhPopup, MhSidebar, SidebarItem, MHNavbar, MHFooter } from 'ui';
import { AuthStore } from 'store';
import { APP_CONFIG } from 'models';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MhToastContainer, MhPopup, MhSidebar, MHNavbar, MHFooter],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('dashboard');
  protected readonly sidebarCollapsed = MhSidebar.collapsed;
  private readonly config = inject(APP_CONFIG);
  readonly authStore = inject(AuthStore);

  readonly marketingUrl = this.config.marketingUrl;
  readonly navItems: SidebarItem[] = [
    { label: 'Dashboard', icon: 'home', route: '/', exact: true },
    { label: 'Simulations', icon: 'simulation', route: '/simulations' },
  ];
}