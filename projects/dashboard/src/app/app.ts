import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MhToastContainer, MhPopup, MhSidebar, SidebarItem, MHNavbar, MHFooter } from 'ui';
import { AuthStore } from 'store';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MhToastContainer, MhPopup, MhSidebar, MHNavbar, MHFooter],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('dashboard');
  protected readonly sidebarCollapsed = MhSidebar.collapsed;
  readonly authStore = inject(AuthStore);

  readonly navItems: SidebarItem[] = [
    { label: 'Dashboard', icon: 'home', route: '/', exact: true },
  ];
}