import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private users = [
    { username: 'admin', password: '1234', role: 'admin', avatar: 'assets/images/avatar.png' },
    { username: 'taynara', password: '4321', role: 'default', avatar: 'assets/images/avatar.png' },
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
      this.router.navigate(['/events']);
      return true;
    } else {
      this.toastr.error('Usuário ou senha incorretos.', 'Erro no login');
      return false;
    }
  }

  logout(): void {
    localStorage.removeItem('user');
    this.toastr.info('Logout.');
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    const user = localStorage.getItem('user');
    return user !== null;
  }
  
  getUserData() {
    const storedUser = localStorage.getItem('user');
  return storedUser ? JSON.parse(storedUser) : null;
  }
  
}
