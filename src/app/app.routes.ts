import { CanActivateFn, Router, Routes } from '@angular/router';
import { AuthService } from './auth/auth.service';
import { inject } from '@angular/core';

const userLogged: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isAuthenticated()) {
    return true; // Usuário se logou
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
  //{ path: 'events', loadComponent: () => import('./events/events.component').then(m => m.EventsComponent), canActivate: [userLogged] }
];
