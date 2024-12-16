import { Component, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { PrimaryButtonComponent } from '../../../components/primary-button/primary-button.component';
import { Product } from '../../../models/products.models';
import { CartService } from '../../../services/cart.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule, RouterLink, PrimaryButtonComponent],
  template: `
    <div class="product-card bg-white shadow-lg border border-gray-200 rounded-xl p-4 flex flex-col gap-2 relative hover:shadow-xl transition-shadow duration-300">
      <div class="mx-auto">
        <img [src]="product.image" class="w-[150px] h-[150px] object-contain" />
      </div>
      <div class="flex flex-col items-center text-center">
        <span class="text-lg font-bold truncate w-full">{{ product.title }}</span>
        <span class="text-md text-gray-600">{{ '$' + product.price }}</span>

        <app-primary-button
          label="Añadir a la cesta"
          class="mt-2 w-full text-lg font-bold py-3  hover:text-white transition-colors duration-300"
          (btnClicked)="addToCart()"
        ></app-primary-button>

        <!-- Enlace para ver detalles -->
        <button
           class="text-sm font-bold bg-orange-500 text-white py-2 px-4 rounded-lg mt-2 focus:outline-none focus:ring-2 focus:ring-orange-300 w-full hover:bg-orange-600"
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
      .truncate {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      @media (max-width: 640px) {
        .product-card {
          padding: 2rem 1rem;
        }
        .product-card img {
          width: 100px;
          height: 100px;
        }
        .product-card span {
          font-size: 0.875rem;
        }
        .product-card button {
          padding: 0.5rem 1rem;
        }
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