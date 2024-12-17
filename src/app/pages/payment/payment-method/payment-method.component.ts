import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-payment-method',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="bg-white p-6 rounded-xl shadow-xl border">
      <h2 class="text-2xl mb-4 font-bold">Forma de Pago</h2>
      <form (ngSubmit)="nextStep()">
        <div class="mb-4">
          <label class="block mb-2">Método de Pago</label>
          <div class="flex flex-col gap-4">
            <div class="flex items-center">
              <input
                type="radio"
                [(ngModel)]="paymentMethod"
                name="paymentMethod"
                value="installments"
                class="mr-2"
                required
              />
              <div>
                <span class="font-bold">Pagar en 3 plazos</span>
                <p class="text-sm">
                  Divide tu compra en 3 pagos sin intereses de 16,33 € (0% TAE)
                </p>
                <a href="#" class="text-blue-500 text-sm">Cómo funciona</a>
              </div>
            </div>
            <div class="flex items-center">
              <input
                type="radio"
                [(ngModel)]="paymentMethod"
                name="paymentMethod"
                value="paypal"
                class="mr-2"
                required
              />
              <div class="flex items-center">
                <i class="fab fa-paypal fa-2x mr-2 text-orange-500"></i>
                <span class="font-bold">Pago con PayPal</span>
              </div>
            </div>
            <div class="flex items-center">
              <input
                type="radio"
                [(ngModel)]="paymentMethod"
                name="paymentMethod"
                value="creditCard"
                class="mr-2"
                required
              />
              <div>
                <span class="font-bold">Pago con tarjeta</span>
                <div class="flex gap-2 mt-1">
                  <i class="fab fa-cc-visa fa-2x text-orange-500"></i>
                  <i class="fab fa-cc-mastercard fa-2x text-orange-500"></i>
                  <i class="fab fa-cc-amex fa-2x text-orange-500"></i>
                  <i class="fab fa-cc-discover fa-2x text-orange-500"></i>
                </div>
              </div>
            </div>
            <div class="flex items-center">
              <input
                type="radio"
                [(ngModel)]="paymentMethod"
                name="paymentMethod"
                value="cashOnDelivery"
                class="mr-2"
                required
              />
              <div>
                <span class="font-bold">Pago contra reembolso</span>
              </div>
            </div>
          </div>
        </div>
        <div class="flex justify-between">
          <button
            type="button"
            (click)="previousStep()"
            class="bg-gray-500 text-white px-4 py-2 rounded"
          >
            Anterior
          </button>
          <button
            type="submit"
            class="bg-orange-500 text-white px-4 py-2 rounded"
          >
            Siguiente
          </button>
        </div>
      </form>
    </div>
  `,
  styles: [],
})
export class PaymentMethodComponent {
  paymentMethod = 'creditCard';

  constructor(private router: Router) {}

  nextStep() {
    this.router.navigate(['/payment/confirmation']);
  }

  previousStep() {
    this.router.navigate(['/payment/address']);
  }
}