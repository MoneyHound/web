import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthStore } from 'store';

export const authGuard = async () => {
  const authStore = inject(AuthStore);
  const router = inject(Router);

  if (authStore.user() === null) {
    await authStore.fetchProfile();
  }

  if (authStore.isAuthenticated()) {
    return true;
  }

  return false;
};

export const unAuthGuard = async () => {
  const authStore = inject(AuthStore);
  const router = inject(Router);

  if (!authStore.user()) {
    return true;
  }

  router.navigate(['/']);
  return false;
}