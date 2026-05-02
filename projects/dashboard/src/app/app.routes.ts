import { Routes } from '@angular/router';
import { Register, SignIn, NotFound, authGuard, unAuthGuard } from 'auth';
import { Dashboard } from './pages/dashboard/dashboard';
import { Profile } from './pages/profile/profile';
import { Simulations } from './pages/simulations/simulations';

export const routes: Routes = [
  {
    path: '',
    component: Dashboard,
    canActivate: [authGuard],
  },
  {
    path: 'simulations',
    component: Simulations,
    canActivate: [authGuard],
  },
  {
    path: 'profile',
    component: Profile,
    canActivate: [authGuard],
  },
  {
    path: 'register',
    component: Register,
    canActivate: [unAuthGuard]
  },
  {
    path: 'signin',
    component: SignIn,
    canActivate: [unAuthGuard]
  },
  {
    path: '**',
    component: NotFound,
  },
];