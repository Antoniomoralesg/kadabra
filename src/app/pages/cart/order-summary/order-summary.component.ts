import { Component, computed, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../../../services/cart.service';
import { PrimaryButtonComponent } from '../../../components/primary-button/primary-button.component';

@Component({
  selector: 'app-order-summary',
  imports: [PrimaryButtonComponent],
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.css'],
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