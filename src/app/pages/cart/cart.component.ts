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
  template: `
    <div class="p-6 flex flex-col gap-4">
      <button (click)="goHome()" class="back-button mb-4 flex items-center">
        <mat-icon>home</mat-icon>
        <span class="ml-2">Inicio</span>
      </button>
      <h2 class="text-2xl">Carrito</h2>

      <ng-container *ngFor="let item of cartService.cart(); trackBy: trackById">
        <app-cart-item [item]="item"></app-cart-item>
      </ng-container>
      <app-order-summary></app-order-summary>
    </div>
  `,
  styles: [
    `
      .back-button {
        color: #f97316;
        background: none;
        border: none;
        cursor: pointer;
        font-size: 16px;
      }
    `,
  ],
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
