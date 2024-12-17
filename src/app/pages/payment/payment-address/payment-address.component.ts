import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-payment-address',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="bg-white p-6 rounded-xl shadow-xl border">
      <h2 class="text-2xl mb-4 font-bold">Dirección de Envío</h2>
      <form (ngSubmit)="nextStep()">
        <!-- Campos de dirección -->
        
        <div class="mb-4">
          <label class="block mb-2">Dirección</label>
          <input
            type="text"
            [(ngModel)]="address"
            name="address"
            class="p-2 border rounded w-full"
            required
          />
        </div>
       
        <div class="mb-4">
          <label class="block mb-2">Código postal</label>
          <input
            type="text"
            [(ngModel)]="postalCode"
            name="postalCode"
            class="p-2 border rounded w-full"
            required
          />
        </div>
        <div class="mb-4">
          <label class="block mb-2">Población</label>
          <input
            type="text"
            [(ngModel)]="city"
            name="city"
            class="p-2 border rounded w-full"
            required
          />
        </div>
        <div class="mb-4">
          <label class="block mb-2">País</label>
          <input
            type="text"
            [(ngModel)]="country"
            name="country"
            class="p-2 border rounded w-full"
            required
          />
        </div>
        <div class="mb-4">
          <label class="block mb-2">Teléfono móvil (opcional)</label>
          <input
            type="text"
            [(ngModel)]="phone"
            name="phone"
            class="p-2 border rounded w-full"
          />
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
export class PaymentAddressComponent {
  
  address = '';
  
  postalCode = '';
  city = '';
  country = 'España';
  phone = '';

  constructor(private router: Router) {}

  nextStep() {
    this.router.navigate(['/payment/method']);
  }

  previousStep() {
    this.router.navigate(['/cart']);
  }
}
