import {ApplicationConfig, APP_INITIALIZER, ErrorHandler, provideZoneChangeDetection} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {provideHttpClient, withInterceptors} from '@angular/common/http';
import {provideNativeDateAdapter} from '@angular/material/core';
import {tokenInterceptor} from './interceptors/token.interceptor';
import {GlobalErrorHandler} from './handlers/global-error.handler';
import {AppConfigService} from './services/app-config.service';

export function initializeApp(appConfigService: AppConfigService) {
  return (): Promise<void> => appConfigService.load();
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({eventCoalescing: true}),
    provideRouter(routes),
    provideHttpClient(withInterceptors([tokenInterceptor])),
    provideNativeDateAdapter(),
    {provide: ErrorHandler, useClass: GlobalErrorHandler},
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      deps: [AppConfigService],
      multi: true
    }
  ]
};
