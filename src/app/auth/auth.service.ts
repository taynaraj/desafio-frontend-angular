import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private users = [
    { username: 'admin', password: '1234', role: 'admin' },
    { username: 'taynara', password: '4321', role: 'default' },
  ];

  constructor(private router: Router, private toastr: ToastrService) {}

  login(username: string, password: string): boolean {
    const user = this.users.find(
      (u) => u.username === username && u.password === password
    );

    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
      this.toastr.success(
        `Bem-vindo(a), ${user.username}!`,
        'Login realizado com sucesso'
      );
      setTimeout(() => this.router.navigate(['/events']), 0);
      return true;
    } else {
      this.toastr.error('Usuário ou senha incorretos.', 'Erro no login');
      return false;
    }
  }

  logout(): void {
    localStorage.removeItem('user');
    this.toastr.info('Logout realizado com sucesso.');
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    const user = localStorage.getItem('user');
    console.log('isAuthenticated chamado. Usuário encontrado:', user);
    return user !== null;
  }
}
