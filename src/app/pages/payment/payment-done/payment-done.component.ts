import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CartService } from '../../../services/cart.service';

@Component({
  selector: 'app-payment-done',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="bg-white p-6 rounded-xl shadow-xl border text-center">
      <h2 class="text-2xl mb-4 font-bold">¡Hecho!</h2>
      <p>Tu pedido ha sido realizado con éxito.</p>
      <div class="mt-6">
        <button (click)="goHome()" class="bg-orange-500 text-white px-4 py-2 rounded">Volver a la Home</button>
      </div>
    </div>
  `,
  styles: []
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