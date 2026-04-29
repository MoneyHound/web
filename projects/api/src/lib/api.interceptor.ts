import { HttpInterceptorFn, HttpRequest, HttpHandlerFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { API_ERROR_HANDLER } from './api-error-handler.token';

export const apiInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
  const handleError = inject(API_ERROR_HANDLER);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      handleError(error);
      return throwError(() => error);
    }),
  );
};