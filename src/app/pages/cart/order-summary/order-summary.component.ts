import { Component, computed, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../../../services/cart.service';
import { PrimaryButtonComponent } from '../../../components/primary-button/primary-button.component';

@Component({
  selector: 'app-order-summary',
  imports: [PrimaryButtonComponent],
  template: `
    <div class="bg-slate-100 p-6 rounded-xl shadow-xl border">
      <h2 class="text-2xl">Resumen del pedido</h2>
      <div class="flex flex-col gap-4">
        <div class="flex gap-4">
          <span class="text-lg">Total</span>
          <span class="text-lg font-bold">{{ '€ ' + total() }}</span>
        </div>
        <app-primary-button label="Proceder al pago" (btnClicked)="proceedToPayment()" />
      </div>
    </div>
  `,
  styles: [],
})
export class OrderSummaryComponent {
  cartService = inject(CartService);
  router = inject(Router);

  total = computed(() => {
    let total = 0;
    for (const item of this.cartService.getCart()) {
      total += item.price;
    }
    return total;
  });

  proceedToPayment() {
    this.router.navigate(['/payment']);
  }
}