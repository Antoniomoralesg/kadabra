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
    // Cargar el usuario actual desde localStorage si existe
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      this.isAuthenticated = true;
      this.currentUser = storedUser;
    }
  }

  /**
   * Registra un nuevo usuario.
   * @param username - Nombre de usuario
   * @param password - Contraseña
   * @param email - Correo electrónico
   * @param firstName - Nombre
   * @param lastName - Apellido
   * @returns boolean - Indica si el registro fue exitoso
   */
  register(
    username: string,
    password: string,
    email: string,
    firstName: string,
    lastName: string
  ): boolean {
    const users = this.getUsers();
    if (users[username]) {
      return false; // Usuario ya existe
    }
    users[username] = { password, email, firstName, lastName };
    this.saveUsers(users);
    return true;
  }

  /**
   * Inicia sesión con un usuario existente.
   * @param username - Nombre de usuario
   * @param password - Contraseña
   * @returns boolean - Indica si el inicio de sesión fue exitoso
   */
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

  /**
   * Cierra la sesión del usuario actual.
   */
  logout() {
    this.isAuthenticated = false;
    this.currentUser = null;
    localStorage.removeItem('currentUser');
    this.cartService.clearCart(); // Vaciar el carrito al cerrar sesión
    this.router.navigate(['/login']);
  }

  /**
   * Verifica si el usuario está autenticado.
   * @returns boolean - Indica si el usuario está autenticado
   */
  isLoggedIn(): boolean {
    return this.isAuthenticated;
  }

  /**
   * Obtiene el nombre del usuario actual.
   * @returns string | null - Nombre del usuario actual o null si no hay usuario autenticado
   */
  getCurrentUser(): string | null {
    return this.currentUser;
  }

  /**
   * Obtiene todos los usuarios registrados.
   * @returns { [key: string]: { password: string; email: string; firstName: string; lastName: string; } } - Objeto con los usuarios registrados
   */
  public getUsers(): {
    [key: string]: {
      password: string;
      email: string;
      firstName: string;
      lastName: string;
    };
  } {
    const users = localStorage.getItem('users');
    return users ? JSON.parse(users) : {};
  }

  /**
   * Guarda los usuarios en localStorage.
   * @param users - Objeto con los usuarios a guardar
   */
  private saveUsers(users: {
    [key: string]: {
      password: string;
      email: string;
      firstName: string;
      lastName: string;
    };
  }) {
    localStorage.setItem('users', JSON.stringify(users));
  }
}
