import { Routes } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth/auth.service';
import { LoggedComponent } from './shared/layouts/logged.component';

const userLogged = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isAuthenticated()) {
    console.log('Usuário logado.');
    return true;
  } else {
    router.navigate(['/login']);
    return false;
  }
};

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  {
    path: 'login',
    loadComponent: () =>
      import('./auth/login/login.component').then((m) => m.LoginComponent),
  },

  {
    path: '',
    component: LoggedComponent, 
    canActivate: [userLogged],
    children: [
      {
        path: 'events',
        loadComponent: () =>
          import('./events/events.component').then((m) => m.EventsComponent),
      },
      {
        path: 'event/edit/:id',
        loadComponent: () =>
          import('./events/edit-event.component').then((m) => m.EditEventComponent),
      },
    ],
  },
];
