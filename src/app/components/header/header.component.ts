import { Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { PrimaryButtonComponent } from '../primary-button/primary-button.component';
import { CartService } from './../../services/cart.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [PrimaryButtonComponent, RouterLink, MatIconModule],
  template: `
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

      <div class="flex items-center space-x-4">
        <app-primary-button
          label="{{ cartLabel() }}"
          routerLink="/cart"
          class="flex items-center space-x-2"
        >
        <mat-icon class="text-black !important">shopping_cart</mat-icon>
        </app-primary-button>
      </div>
    </div>
  `,
  styles: [],
})
export class HeaderComponent {
  CartService = inject(CartService);

  cartLabel = computed(() => ` (${this.CartService.cart().length})`);
}
