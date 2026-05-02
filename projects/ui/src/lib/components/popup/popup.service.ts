import { Injectable, signal, Type } from '@angular/core';

export interface PopupAction {
  label: string;
  type: 'primary' | 'secondary';
  action?: () => void;
}

export interface PopupConfig {
  title: string;
  message?: string;
  type: 'success' | 'error' | 'warning' | 'info';
  actions?: PopupAction[];
  iframeUrl?: string;
  component?: Type<unknown>;
  wide?: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class PopupService {
  private readonly _popup = signal<PopupConfig | null>(null);

  readonly popup = this._popup.asReadonly();

  open(config: PopupConfig): void {
    this._popup.set(config);
  }

  close(): void {
    this._popup.set(null);
  }
}