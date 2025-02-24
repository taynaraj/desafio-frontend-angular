import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

describe('AuthService', () => {
  let service: AuthService;
  let routerSpy = { navigate: jasmine.createSpy('navigate') };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthService,
        { provide: Router, useValue: routerSpy }
      ]
    });

    service = TestBed.inject(AuthService);
  });

  it('deve autenticar usuário', () => {
    const loginResult = service.login('admin', '1234');
    expect(loginResult).toBeTrue();
    expect(localStorage.getItem('user')).not.toBeNull();
  });

  it('deve falhar no login com credenciais erradas', () => {
    const loginResult = service.login('admin', 'senhaErrada');
    expect(loginResult).toBeFalse();
    expect(localStorage.getItem('user')).toBeNull();
  });

  it('deve fazer logout', () => {
    service.logout();
    expect(localStorage.getItem('user')).toBeNull();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/login']);
  });

  it('deve verificar se o usuário autenticado', () => {
    service.login('admin', '1234');
    expect(service.isAuthenticated()).toBeTrue();

    service.logout();
    expect(service.isAuthenticated()).toBeFalse();
  });
});
