import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from './cart.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isAuthenticated = false;
  private currentUser: string | null = null;

  constructor(private router: Router, private cartService: CartService) {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      this.isAuthenticated = true;
      this.currentUser = storedUser;
    }
  }

  register(username: string, password: string, email: string, firstName: string, lastName: string): boolean {
    const users = this.getUsers();
    if (users[username]) {
      return false; // Usuario ya existe
    }
    users[username] = { password, email, firstName, lastName };
    this.saveUsers(users);
    return true;
  }

  login(username: string, password: string): boolean {
    const users = this.getUsers();
    const storedUser = users[username];
    if (storedUser && storedUser.password === password) {
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

  public getUsers(): { [key: string]: { password: string, email: string, firstName: string, lastName: string } } {
    const users = localStorage.getItem('users');
    return users ? JSON.parse(users) : {};
  }

  private saveUsers(users: { [key: string]: { password: string, email: string, firstName: string, lastName: string } }) {
    localStorage.setItem('users', JSON.stringify(users));
  }
}