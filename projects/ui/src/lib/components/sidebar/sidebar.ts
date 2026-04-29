import { Component, input, output, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

export interface SidebarItem {
  label: string;
  icon: string;
  route: string;
  exact?: boolean;
}

@Component({
  selector: 'mh-sidebar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
})
export class MhSidebar {
  readonly items = input<SidebarItem[]>([]);
  readonly userName = input('');
  readonly userEmail = input('');
  readonly logout = output();

  static readonly _collapsed = signal(false);
  static readonly collapsed = MhSidebar._collapsed.asReadonly();

  get isCollapsed(): boolean {
    return MhSidebar._collapsed();
  }

  toggle(): void {
    MhSidebar._collapsed.update((v) => !v);
  }
}