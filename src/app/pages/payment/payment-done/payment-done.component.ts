import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CartService } from '../../../services/cart.service';

@Component({
  selector: 'app-payment-done',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './payment-done.component.html',
  styleUrls: ['./payment-done.component.css'],
})
export class PaymentDoneComponent {
  cartService = inject(CartService);
  router = inject(Router);

  constructor() {
    this.cartService.clearCart(); // Vaciar el carrito al inicializar el componente
  }

  goHome() {
    this.router.navigate(['/']);
  }
}