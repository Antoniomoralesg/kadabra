import { CartService } from './../../../services/cart.service';
import { Product } from './../../../models/products.models';
import { Component, inject, input } from '@angular/core';
import { PrimaryButtonComponent } from '../../../components/primary-button/primary-button.component';
import { ProductDetailComponent } from '../../product-detail/product-detail.component';
import { RouterLink } from '@angular/router';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-card',
  imports: [PrimaryButtonComponent, RouterModule, RouterLink, CommonModule],
  template: `
    <div
      class="bg-white shadow-md border rounded-xl p-6 flex flex-col gap-6 relative"
    >
      <div class="mx-auto">
        <img
          [src]="product().image"
          class="w-[200px] h-[100px] object-contain"
        />
      </div>
      <div class="flex flex-col">
        <span class="text-md font-bold">{{ product().title }}</span>
        <span class="text-sm">{{ '$' + product().price }}</span>

        <app-primary-button
          label="Añadir a la cesta"
          class="mt-3"
          (btnClicked)="CartService.addToCart(product())"
        />

        <span
          class="absolute top-2 right-3 text-sm font-bold"
          [class]="product().stock ? 'text-green-500' : 'text-red-500'"
        >
          {{ product().stock ? product().stock + ' left' : 'Out of stock' }}
        </span>

        <!-- Enlace para ver detalles -->
        <button
          class="text-sm bg-orange-500 text-white py-2 px-4 rounded-lg mt-3 focus:outline-none focus:ring-2 focus:ring-blue-300"
          [routerLink]="['/product', product().id]"
        >
          Ver detalles
        </button>
      </div>
    </div>
  `,
  styles: [],
})
export class ProductCardComponent {
  CartService = inject(CartService);
  product = input.required<Product>();
}
