import { Routes } from '@angular/router';
import { Register, SignIn, NotFound } from 'auth';
import { Home } from './pages/home/home';
import { authGuard, unAuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    component: Home,
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