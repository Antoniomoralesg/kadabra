import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart.service';
import { CartItemComponent } from './cart-item/cart-item.component';
import { OrderSummaryComponent } from './order-summary/order-summary.component';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [
    CommonModule,
    CartItemComponent,
    OrderSummaryComponent,
    MatIconModule,
  ],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent {
  cartService = inject(CartService);
  router = inject(Router);

  goHome() {
    this.router.navigate(['/']);
  }

  trackById(index: number, item: any) {
    return item.id;
  }
}