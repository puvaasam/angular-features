import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { HttpRequest, provideHttpClient, withInterceptors } from '@angular/common/http';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { apiHeadersInterceptor } from './interceptors/api-headers.interceptor';
import { apiResponseInterceptor } from './interceptors/api-response.interceptor';
import { map } from 'rxjs';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(withInterceptors([apiHeadersInterceptor, apiResponseInterceptor])),
    provideClientHydration(withEventReplay())
    
  ]
};
