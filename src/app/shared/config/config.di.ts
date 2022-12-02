import { inject, InjectionToken, Provider } from '@angular/core';
import { AppConfig } from './config.model';

export const APP_CONFIG = new InjectionToken<AppConfig>(
  'Application level configuration'
);

export function provideAppConfig(config: AppConfig): Provider {
  return { provide: APP_CONFIG, useValue: config };
}

export function injectAppConfig(): AppConfig {
  return inject(APP_CONFIG);
}
