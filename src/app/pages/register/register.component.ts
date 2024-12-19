import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router, RouterModule } from '@angular/router';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon'; 

@Component({
  selector: 'app-register',
  template: `
    <div
      class="flex items-center justify-center min-h-screen bg-cover bg-center py-12"
      style="background-image: url('registro.jpg');"
    >
      <div
        class="bg-white bg-opacity-90 p-8 rounded shadow-md w-full max-w-md border border-orange-500"
      >
        <h2 class="text-2xl font-bold mb-6 text-center">Registro</h2>
        <form
          #registerForm="ngForm"
          (ngSubmit)="onSubmit(registerForm)"
          class="space-y-4"
        >
          <div>
            <label
              for="firstName"
              class="block text-sm font-medium text-gray-700"
              >Nombre:</label
            >
            <input
              type="text"
              id="firstName"
              [(ngModel)]="firstName"
              name="firstName"
              required
              class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              #firstNameInput="ngModel"
            />
            <div
              *ngIf="firstNameInput.invalid && firstNameInput.touched"
              class="text-red-500 text-sm"
            >
              Nombre es requerido.
            </div>
          </div>
          <div>
            <label
              for="lastName"
              class="block text-sm font-medium text-gray-700"
              >Apellido:</label
            >
            <input
              type="text"
              id="lastName"
              [(ngModel)]="lastName"
              name="lastName"
              required
              class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              #lastNameInput="ngModel"
            />
            <div
              *ngIf="lastNameInput.invalid && lastNameInput.touched"
              class="text-red-500 text-sm"
            >
              Apellido es requerido.
            </div>
          </div>
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700"
              >Correo Electrónico:</label
            >
            <input
              type="email"
              id="email"
              [(ngModel)]="email"
              name="email"
              required
              email
              class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              #emailInput="ngModel"
            />
            <div
              *ngIf="emailInput.invalid && emailInput.touched"
              class="text-red-500 text-sm"
            >
              Correo electrónico válido es requerido.
            </div>
          </div>
          <div>
            <label
              for="username"
              class="block text-sm font-medium text-gray-700"
              >Nombre de Usuario:</label
            >
            <input
              type="text"
              id="username"
              [(ngModel)]="username"
              name="username"
              required
              class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              #usernameInput="ngModel"
            />
            <div
              *ngIf="usernameInput.invalid && usernameInput.touched"
              class="text-red-500 text-sm"
            >
              Nombre de usuario es requerido.
            </div>
          </div>
          <div>
            <label
              for="password"
              class="block text-sm font-medium text-gray-700"
              >Contraseña:</label
            >
            <div class="relative">
              <input
                [type]="showPassword ? 'text' : 'password'"
                id="password"
                [(ngModel)]="password"
                name="password"
                required
                minlength="6"
                class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                #passwordInput="ngModel"
              />
              <button
                type="button"
                (click)="togglePasswordVisibility()"
                class="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
              >
                <mat-icon>{{
                  showPassword ? 'visibility_off' : 'visibility'
                }}</mat-icon>
              </button>
            </div>
            <div
              *ngIf="passwordInput.invalid && passwordInput.touched"
              class="text-red-500 text-sm"
            >
              Contraseña es requerida y debe tener al menos 6 caracteres.
            </div>
          </div>
          <div>
            <label
              for="confirmPassword"
              class="block text-sm font-medium text-gray-700"
              >Confirmar Contraseña:</label
            >
            <div class="relative">
              <input
                [type]="showConfirmPassword ? 'text' : 'password'"
                id="confirmPassword"
                [(ngModel)]="confirmPassword"
                name="confirmPassword"
                required
                class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                #confirmPasswordInput="ngModel"
              />
              <button
                type="button"
                (click)="toggleConfirmPasswordVisibility()"
                class="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
              >
                <mat-icon>{{
                  showConfirmPassword ? 'visibility_off' : 'visibility'
                }}</mat-icon>
              </button>
            </div>
            <div
              *ngIf="
                confirmPasswordInput.invalid && confirmPasswordInput.touched
              "
              class="text-red-500 text-sm"
            >
              Confirmar contraseña es requerido.
            </div>
            <div
              *ngIf="
                password !== confirmPassword && confirmPasswordInput.touched
              "
              class="text-red-500 text-sm"
            >
              Las contraseñas no coinciden.
            </div>
          </div>
          <div>
            <button
              type="submit"
              class="w-full bg-orange-500 text-white py-2 px-4 rounded-md"
              [disabled]="registerForm.invalid"
            >
              Registrarse
            </button>
          </div>
          <div class="mt-4 text-center">
            <a routerLink="/login" class="text-indigo-600 hover:text-indigo-900"
              >Una vez registrado, ¡inicia sesión!</a
            >
          </div>
        </form>
      </div>
    </div>
  `,
  standalone: true,
  imports: [FormsModule, RouterModule, CommonModule, MatIconModule], 
  styles: [
    `
      .bg-cover {
        background-size: cover;
      }
      .bg-center {
        background-position: center;
      }
      .py-12 {
        padding-top: 3rem;
        padding-bottom: 3rem;
      }
      @media (max-width: 640px) {
        .bg-cover {
          background-size: contain;
        }
        .bg-white {
          background-color: rgba(255, 255, 255, 0.9);
        }
        .p-8 {
          padding: 1rem;
        }
      }
    `,
  ],
})
export class RegisterComponent {
  firstName = '';
  lastName = '';
  email = '';
  username = '';
  password = '';
  confirmPassword = '';
  showPassword = false;
  showConfirmPassword = false;

  constructor(private authService: AuthService, private router: Router) {}

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPasswordVisibility() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  onSubmit(form: NgForm) {
    if (this.password !== this.confirmPassword) {
      Swal.fire({
        title: 'Error en el registro',
        text: 'Las contraseñas no coinciden. Por favor, inténtalo de nuevo.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
      return;
    }

    if (
      this.authService.register(
        this.username,
        this.password,
        this.email,
        this.firstName,
        this.lastName
      )
    ) {
      Swal.fire({
        title: 'Registro exitoso',
        text: 'Te has registrado con éxito. Ahora puedes iniciar sesión.',
        icon: 'success',
        confirmButtonText: 'OK',
      }).then(() => {
        // Redirigir al usuario a la página de inicio de sesión
        this.router.navigate(['/login']);
      });
    } else {
      Swal.fire({
        title: 'Error en el registro',
        text: 'El nombre de usuario ya existe. Por favor, elige otro.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
    }
  }
}