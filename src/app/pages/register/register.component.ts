import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router, RouterModule } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  template: `
    <div class="flex items-center justify-center min-h-screen bg-cover bg-center" style="background-image: url('registro.jpg');">
      <div class="bg-white p-8 rounded shadow-md w-full max-w-md border border-orange-500">
        <h2 class="text-2xl font-bold mb-6 text-center">Registro</h2>
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
            <button type="submit" class="w-full bg-orange-500 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Register</button>
          </div>
          <div class="mt-4 text-center">
            <a routerLink="/login" class="text-indigo-600 hover:text-indigo-900">Una vez registrado, ¡inicia sesión!</a>
          </div>
        </form>
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
export class RegisterComponent {
  username = '';
  password = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    if (this.authService.register(this.username, this.password)) {
      Swal.fire({
        title: 'Registro exitoso',
        text: 'Te has registrado con éxito. Ahora puedes iniciar sesión.',
        icon: 'success',
        confirmButtonText: 'OK'
      }).then(() => {
        // Redirigir al usuario a la página de inicio de sesión
        this.router.navigate(['/login']);
      });
    } else {
      Swal.fire({
        title: 'Error en el registro',
        text: 'El nombre de usuario ya existe. Por favor, elige otro.',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    }
  }
}