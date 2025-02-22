import { Routes } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth/auth.service';

const userLogged = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  console.log('Verificando autenticação...');

  if (authService.isAuthenticated()) {
    console.log('Usuário logado.');
    return true; 
  } else {
    console.log('Não logou');
    router.navigate(['/login']);
    return false;
  }
};

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', loadComponent: () => import('./auth/login/login.component').then(m => m.LoginComponent) },
  {
    path: 'events',
    loadComponent: () =>
      import('./events/events.component').then(m => m.EventsComponent),
    canActivate: [userLogged],
  },
];
