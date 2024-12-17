import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CartService } from '../../../services/cart.service';

@Component({
  selector: 'app-payment-confirmation',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="bg-white p-6 rounded-xl shadow-xl border">
      <h2 class="text-2xl mb-4 font-bold">Confirmación del Pedido</h2>
      
      <div class="mb-4">
        <h3 class="text-xl font-bold">Entrega prevista</h3>
        <p>Mañana, 18.12 - Jue., 19.12</p>
      </div>
      
      <div class="mb-4">
        <h3 class="text-xl font-bold">Opciones de Envío</h3>
        <div class="flex flex-col gap-2">
          <div class="flex justify-between">
            <span>Envío estándar</span>
            <span>gratis</span>
          </div>
          <div class="flex justify-between">
            <span>Mañana, 18.12 - Jue., 19.12</span>
            <span>Envío premium</span>
            <span>3,95 €</span>
          </div>
          <p class="text-sm text-gray-500">El servicio de envío exprés no está disponible para este pedido.</p>
        </div>
      </div>
      
      <div class="mb-4">
        <h3 class="text-xl font-bold">Pedido</h3>
        <div *ngFor="let item of cartItems" class="mb-2">
          <div class="flex justify-between">
            <span>{{ item.title }} - {{ item.color }}</span>
            <span>{{ '€ ' + item.price }}</span>
          </div>
          <div class="text-sm text-gray-500">
            
            
            <img [src]="item.image" alt="{{ item.title }}" class="w-16 h-16 object-cover mt-2" />
          </div>
        </div>
        <div class="flex justify-between font-bold">
          <span>Envío</span>
          <span>0,00 €</span>
        </div>
        <div class="flex justify-between font-bold">
          <span>Total IVA incluido</span>
          <span>{{ '€ ' + total }}</span>
        </div>
      </div>
      
      <div class="flex justify-between">
        <button type="button" (click)="previousStep()" class="bg-gray-500 text-white px-4 py-2 rounded">Anterior</button>
        <button (click)="nextStep()" class="bg-orange-500 text-white px-4 py-2 rounded">Confirmar y Pagar</button>
      </div>
    </div>
  `,
  styles: []
})
export class PaymentConfirmationComponent {
  cartItems: any[];
  total: number;

  constructor(private router: Router, private cartService: CartService) {
    this.cartItems = this.cartService.cart();
    this.total = this.cartItems.reduce((sum, item) => sum + item.price, 0);
  }

  nextStep() {
    this.router.navigate(['/payment/done']);
  }

  previousStep() {
    this.router.navigate(['/payment/method']);
  }
}