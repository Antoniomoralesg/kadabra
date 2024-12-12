import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from './cart.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isAuthenticated = false;
  private users = new Map<string, string>(); // Almacena usuarios y contraseñas
  private currentUser: string | null = null;

  constructor(private router: Router, private cartService: CartService) {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      this.isAuthenticated = true;
      this.currentUser = storedUser;
    }
  }

  register(username: string, password: string): boolean {
    if (this.users.has(username)) {
      return false; // Usuario ya existe
    }
    this.users.set(username, password);
    return true;
  }

  login(username: string, password: string): boolean {
    const storedPassword = this.users.get(username);
    if (storedPassword && storedPassword === password) {
      this.isAuthenticated = true;
      this.currentUser = username;
      localStorage.setItem('currentUser', username);
      this.router.navigate(['/protected']);
      return true;
    }
    return false;
  }

  logout() {
    this.isAuthenticated = false;
    this.currentUser = null;
    localStorage.removeItem('currentUser');
    this.cartService.clearCart(); // Vaciar el carrito al cerrar sesión
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return this.isAuthenticated;
  }

  getCurrentUser(): string | null {
    return this.currentUser;
  }
}
