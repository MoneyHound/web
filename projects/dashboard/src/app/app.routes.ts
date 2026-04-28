import { Routes } from '@angular/router';
import { Register, SignIn } from 'auth';

export const routes: Routes = [
  {
    path: 'register',
    component: Register,
  },
  {
    path: 'signin',
    component: SignIn,
  },
];
