import { Routes } from '@angular/router';
import { Register, SignIn, NotFound, authGuard } from 'auth';
import { Dashboard } from './pages/dashboard/dashboard';
import { Profile } from './pages/profile/profile';
import { SIMULATIONS_ROUTES } from './pages/simulations/simulations.routes';

export const routes: Routes = [
  {
    path: '',
    component: Dashboard,
    canActivate: [authGuard],
  },
  {
    path: 'simulations',
    children: SIMULATIONS_ROUTES,
  },
  {
    path: 'profile',
    component: Profile,
    canActivate: [authGuard],
  },
  {
    path: 'register',
    component: Register,
  },
  {
    path: 'signin',
    component: SignIn,
  },
  {
    path: '**',
    component: NotFound,
  },
];