import { Component, inject, Input } from '@angular/core';
import { Product } from '../../../models/products.models';
import { CartService } from '../../../services/cart.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cart-item',
  template: `
    <div
      class="bg-white shadow-md border rounded-xl p-6 flex gap-4 items-center"
    >
      <img [src]="item.image" class="w-[50px] h-[50px] object-contain" />
      <div class="flex flex-col">
        <span class="text-md font-bold">{{ truncateTitle(item.title) }}</span>
        <span class="text-sm"> {{ '$' + item.price }}</span>
      </div>
      <div class="flex-1"></div>
      <button class="btn-red" (click)="confirmRemove()">Eliminar</button>
    </div>
  `,
  styles: [
    `
      .btn-red {
        background-color: #dc2626;
        color: white;
        border: none;
        padding: 0.5rem 1rem;
        border-radius: 0.375rem;
        cursor: pointer;
        font-size: 1rem;
      }
      .btn-red:hover {
        background-color: #b91c1c;
      }
    `,
  ],
})
export class CartItemComponent {
  @Input() item!: Product;

  cartService = inject(CartService);

  truncateTitle(title: string, maxLength: number = 30): string {
    return title.length > maxLength
      ? title.substring(0, maxLength) + '...'
      : title;
  }

  confirmRemove() {
    Swal.fire({
      title: '¿Estás seguro?',
      text: `¿Seguro que quieres eliminar el producto "${this.item.title}"?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.cartService.removeFromCart(this.item);
        Swal.fire(
          'Eliminado',
          'El producto ha sido eliminado del carrito.',
          'success'
        );
      }
    });
  }
}
