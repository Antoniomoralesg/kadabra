import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router'; // Asegúrate de importar RouterModule

@Component({
  selector: 'app-login',
  template: `
    <div class="flex items-center justify-center min-h-screen bg-cover bg-center" style="background-image: url('login.jpg');">
      <div class="bg-white p-8 rounded shadow-md w-full max-w-md border border-orange-500">
        <h2 class="text-2xl font-bold mb-6 text-center">Login</h2>
        <form (ngSubmit)="onSubmit()" class="space-y-4">
          <div>
            <label for="username" class="block text-sm font-medium text-gray-700">Username:</label>
            <input type="text" id="username" [(ngModel)]="username" name="username" required class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
          </div>
          <div>
            <label for="password" class="block text-sm font-medium text-gray-700">Password:</label>
            <input type="password" id="password" [(ngModel)]="password" name="password" required class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
          </div>
          <div>
            <button type="submit" class="w-full bg-orange-500 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Login</button>
          </div>
        </form>
        <div class="mt-4 text-center">
          <a routerLink="/register" class="text-indigo-600 hover:text-indigo-900">¿No tienes cuenta? Registrate aquí</a>
        </div>
      </div>
    </div>
  `,
  standalone: true,
  imports: [FormsModule, RouterModule],
  styles: [
    `
      .bg-cover {
        background-size: cover;
      }
      .bg-center {
        background-position: center;
      }
    `,
  ],
})
export class LoginComponent {
  username = '';
  password = '';

  constructor(private authService: AuthService) {}

  onSubmit() {
    if (!this.authService.login(this.username, this.password)) {
      alert('Login failed');
    }
  }
}