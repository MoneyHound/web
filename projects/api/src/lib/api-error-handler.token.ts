import { InjectionToken } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

export type ApiErrorHandler = (error: HttpErrorResponse) => void;

export const API_ERROR_HANDLER = new InjectionToken<ApiErrorHandler>('API_ERROR_HANDLER');