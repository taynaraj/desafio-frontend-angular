import { bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { AppComponent } from './app/app.component';
import { provideHttpClient } from '@angular/common/http';
import { routes } from './app/app.routes';
import { provideToastr } from 'ngx-toastr';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideAnimations(),
    provideToastr(),
    provideHttpClient(),
  ],
}).catch((err) => console.error(err));
