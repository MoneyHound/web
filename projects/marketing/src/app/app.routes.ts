import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { About } from './pages/about/about';
import { Contact } from './pages/contact/contact';
import { Privacy } from './pages/privacy/privacy';
import { Terms } from './pages/terms/terms';
import { Register, SignIn } from 'auth';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'about', component: About },
  { path: 'contact', component: Contact },
  { path: 'privacy', component: Privacy },
  { path: 'terms', component: Terms },
  { path: 'register', component: Register },
  { path: 'sign-in', component: SignIn },
];