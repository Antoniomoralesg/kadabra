import { Component, inject, Input } from '@angular/core';
import { Product } from '../../../models/products.models';
import { CartService } from '../../../services/cart.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.css'],
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