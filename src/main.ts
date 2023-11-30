import { enableProdMode } from "@angular/core";

import { environment } from "./environments/environment";
import { bootstrapApplication } from "@angular/platform-browser";
import { AppComponent } from "./app/app.component";

import { provideAnimations } from "@angular/platform-browser/animations";
import { routes } from "./app/app.routes";
import { provideRouter, withHashLocation } from "@angular/router";
import { provideHttpClient } from "@angular/common/http";

if (environment.production) {
  enableProdMode();
}

// eslint-disable-next-line no-console
bootstrapApplication(AppComponent, {
  providers: [provideRouter(routes, withHashLocation()), provideAnimations(), provideHttpClient()],
}).catch((err) => console.log(err));
