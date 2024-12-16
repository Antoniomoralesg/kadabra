import { Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { PrimaryButtonComponent } from '../primary-button/primary-button.component';
import { CartService } from './../../services/cart.service';
import { AuthService } from './../../services/auth.service';
import { CommonModule } from '@angular/common';
import { HeaderBannerComponent } from '../../components/header-banner/header-banner.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    PrimaryButtonComponent,
    RouterLink,
    MatIconModule,
    CommonModule,
    HeaderBannerComponent,
  ],
  template: `
    <app-header-banner></app-header-banner>
    <div
      class="bg-white-800 px-4 py-1 shadow-md flex justify-between items-center"
    >
      <button class="text-2xl flex items-center space-x-2" routerLink="/">
        <img
          src="/logo.png"
          alt="Logo"
          class="h-auto w-auto max-h-24 max-w-32 object-contain"
        />
      </button>

      <div class="flex items-center space-x-4 relative">
        <div *ngIf="authService.isLoggedIn()" class="text-gray-700">
          Bienvenido, {{ authService.getCurrentUser() }}
          <button
            (click)="confirmLogout()"
            class="ml-4 text-red-600 hover:text-red-800"
          >
            Cerrar sesión
          </button>
        </div>
        <div *ngIf="!authService.isLoggedIn()" class="group relative">
          <button class="flex items-center space-x-2">
            <mat-icon class="text-black !important">person</mat-icon>
            <span>Login</span>
          </button>
          <div
            class="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-50"
          >
            <a
              routerLink="/login"
              class="block px-4 py-2 text-gray-800 hover:bg-gray-100"
              >Login</a
            >
            <a
              routerLink="/register"
              class="block px-4 py-2 text-gray-800 hover:bg-gray-100"
              >Register</a
            >
          </div>
        </div>
        <div class="relative group">
          <app-primary-button
            label="{{ cartLabel() }}"
            routerLink="/cart"
            class="flex items-center space-x-2"
          >
            <mat-icon class="text-black !important">shopping_cart</mat-icon>
          </app-primary-button>
          <div
            *ngIf="CartService.cart().length === 0"
            class="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-50 p-4"
          >
            <p class="text-gray-800 font-semibold">Tu cesta está vacía</p>
            <p class="text-gray-600">¿Necesitas inspiración?</p>
            <a
              routerLink="/products"
              class="block mt-2 text-orange-500 hover:text-orange-600 font-semibold hover:underline"
            >
              Ver novedades
            </a>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [],
})
export class HeaderComponent {
  CartService = inject(CartService);
  authService = inject(AuthService);

  cartLabel = computed(() => ` (${this.CartService.cart().length})`);

  confirmLogout() {
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¿Seguro que quieres cerrar sesión?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, cerrar sesión',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.logout();
        Swal.fire(
          'Sesión cerrada',
          'Has cerrado sesión correctamente.',
          'success'
        );
      }
    });
  }

  logout() {
    this.authService.logout();
  }
}
