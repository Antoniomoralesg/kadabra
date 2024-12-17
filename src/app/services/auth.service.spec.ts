import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { CartService } from './cart.service';

describe('AuthService', () => {
  let service: AuthService;
  let router: Router;
  let cartService: CartService;

  beforeEach(() => {
    const routerMock = {
      navigate: jasmine.createSpy('navigate'),
    };

    const cartServiceMock = {
      clearCart: jasmine.createSpy('clearCart'),
    };

    TestBed.configureTestingModule({
      providers: [
        AuthService,
        { provide: Router, useValue: routerMock },
        { provide: CartService, useValue: cartServiceMock },
      ],
    });

    service = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
    cartService = TestBed.inject(CartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return false when there is no auth token', () => {
    localStorage.removeItem('currentUser');
    service = TestBed.inject(AuthService); // Re-inyectar para actualizar el estado
    expect(service.isLoggedIn()).toBe(false);
  });

  it('should return true when there is an auth token', () => {
    localStorage.setItem('currentUser', 'test-user');
    service = TestBed.inject(AuthService); // Re-inyectar para actualizar el estado
    expect(service.isLoggedIn()).toBe(true);
  });

  it('should store the auth token on login', () => {
    service.register('test-user', 'test-password');
    const result = service.login('test-user', 'test-password');
    expect(result).toBe(true);
    expect(localStorage.getItem('currentUser')).toBe('test-user');
    expect(router.navigate).toHaveBeenCalledWith(['/protected']);
  });

  it('should remove the auth token on logout', () => {
    localStorage.setItem('currentUser', 'test-user');
    service.logout();
    expect(localStorage.getItem('currentUser')).toBeNull();
    expect(cartService.clearCart).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['/login']);
  });

  it('should not login with incorrect credentials', () => {
    service.register('test-user', 'test-password');
    const result = service.login('test-user', 'wrong-password');
    expect(result).toBe(false);
    expect(service.isLoggedIn()).toBe(false);
  });

  it('should register a new user', () => {
    const result = service.register('new-user', 'new-password');
    expect(result).toBe(true);
    expect(service.login('new-user', 'new-password')).toBe(true);
  });

  it('should not register an existing user', () => {
    service.register('existing-user', 'password');
    const result = service.register('existing-user', 'password');
    expect(result).toBe(false);
  });

  it('should get the current user', () => {
    service.register('test-user', 'test-password');
    service.login('test-user', 'test-password');
    expect(service.getCurrentUser()).toBe('test-user');
  });
});