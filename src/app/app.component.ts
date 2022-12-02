import {
  HttpInterceptorFn,
  provideHttpClient,
  withInterceptors,
} from '@angular/common/http';
import { Component, importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideRouter, RouterOutlet } from '@angular/router';
import { routes } from './app.routes';
import { injectAppConfig, provideAppConfig } from './shared/config/config.di';
import { AppConfig } from './shared/config/config.model';

@Component({
  selector: 'app-root',
  standalone: true,
  template: '<router-outlet></router-outlet>',
  imports: [RouterOutlet],
})
export class AppComponent {
  static bootstrap(config: AppConfig) {
    return bootstrapApplication(this, {
      providers: [
        importProvidersFrom(BrowserAnimationsModule),
        provideRouter(routes),
        provideHttpClient(withInterceptors([this.pexelsInterceptor])),
        provideAppConfig(config),
      ],
    }).catch((err) => console.error(err));
  }

  private static readonly pexelsInterceptor: HttpInterceptorFn = (
    req,
    next
  ) => {
    const { pexelsApiKey } = injectAppConfig();
    if (!pexelsApiKey) return next(req);
    return next(req.clone({ setHeaders: { Authorization: pexelsApiKey } }));
  };
}
