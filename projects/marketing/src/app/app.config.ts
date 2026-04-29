import { ApplicationConfig, inject, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors, HttpErrorResponse } from '@angular/common/http';
import { apiInterceptor, API_ERROR_HANDLER } from 'api';
import { ToastService } from 'ui';

import { routes } from './app.routes';
import { APP_CONFIG } from 'models';
import { environment } from '../environments/environment.prod';

export const apiErrorHandler = (error: HttpErrorResponse): void => {
  const toastService = inject(ToastService);
  if (error.status === 0) {
    toastService.error('Unable to connect to the server. Check your internet connection and try again.');
  } else if (error.status >= 500) {
    toastService.error('Server error. Please try again later.');
  }
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(withInterceptors([apiInterceptor])),
    { provide: API_ERROR_HANDLER, useValue: apiErrorHandler },
    { provide: APP_CONFIG, useValue: environment }
  ],
};