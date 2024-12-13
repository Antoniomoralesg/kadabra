import { CartService } from './../../../services/cart.service';
import { Product } from './../../../models/products.models';
import { Component, inject, Input } from '@angular/core';
import { PrimaryButtonComponent } from '../../../components/primary-button/primary-button.component';
import { RouterLink } from '@angular/router';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product-card',
  imports: [PrimaryButtonComponent, RouterModule, RouterLink, CommonModule],
  template: `
    <div class="product-card bg-white shadow-lg border border-gray-200 rounded-xl p-6 flex flex-col gap-4 relative hover:shadow-xl transition-shadow duration-300">
      <div class="mx-auto">
        <img [src]="product.image" class="w-[200px] h-[150px] object-contain" />
      </div>
      <div class="flex flex-col items-center text-center">
        <span class="text-lg font-bold">{{ product.title }}</span>
        <span class="text-md text-gray-600">{{ '$' + product.price }}</span>

        <app-primary-button
          label="Añadir a la cesta"
          class="mt-3 w-full"
          (btnClicked)="addToCart()"
        ></app-primary-button>

        <!-- Enlace para ver detalles -->
        <button
          class="text-sm bg-orange-500 text-white py-2 px-4 rounded-lg mt-3 focus:outline-none focus:ring-2 focus:ring-blue-300 w-full"
          [routerLink]="['/product', product.id]"
        >
          Ver detalles
        </button>
      </div>
    </div>
  `,
  styles: [
    `
      .product-card {
        transition: transform 0.3s ease-in-out;
      }
      .product-card:hover {
        transform: translateY(-5px);
      }
    `,
  ],
})
export class ProductCardComponent {
  @Input() product!: Product;
  cartService = inject(CartService);

  addToCart() {
    this.cartService.addToCart(this.product);
    Swal.fire({
      title: 'Producto añadido',
      text: `El producto "${this.product.title}" ha sido añadido a la cesta.`,
      icon: 'success',
      confirmButtonText: 'OK'
    });
  }
}