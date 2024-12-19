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
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css'],
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
      confirmButtonText: 'OK',
    });
  }
}