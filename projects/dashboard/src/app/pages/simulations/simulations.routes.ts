import { Routes } from '@angular/router';
import { authGuard } from 'auth';

export const SIMULATIONS_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./simulations').then((m) => m.Simulations),
    canActivate: [authGuard],
  },
  {
    path: ':id',
    loadComponent: () => import('./view/view-simulation').then((m) => m.ViewSimulation),
    canActivate: [authGuard],
  },
];