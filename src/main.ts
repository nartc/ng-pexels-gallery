import { AppComponent } from './app/app.component';

(async () => {
  const config = await fetch('assets/config.json').then((res) => res.json());
  void AppComponent.bootstrap(config);
})();
