import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Import FormsModule for ngModel
import { CartService } from '../../../services/cart.service';
import { AuthService } from '../../../services/auth.service'; // Import AuthService

@Component({
  selector: 'app-payment-confirmation',
  standalone: true,
  imports: [CommonModule, FormsModule], // Add FormsModule to imports
  template: `
    <div class="bg-white p-6 rounded-xl shadow-xl border">
      <h2 class="text-2xl mb-4 font-bold">Confirmación del Pedido</h2>

      <div class="mb-4">
        <h3 class="text-xl font-bold">Datos del Usuario</h3>
        <p class="text-sm text-gray-500">Nombre: {{ user?.firstName }} {{ user?.lastName }}</p>
        <p class="text-sm text-gray-500">Correo Electrónico: {{ user?.email }}</p>
      </div>

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
          <p class="text-sm text-gray-500">
            El servicio de envío exprés no está disponible para este pedido.
          </p>
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
            <img
              [src]="item.image"
              alt="{{ item.title }}"
              class="w-16 h-16 object-cover mt-2"
            />
          </div>
        </div>
      </div>

      <div class="p-4 bg-gray-100 rounded-lg border border-gray-300 mb-4">
        <div class="flex justify-between font-bold">
          <span>Envío</span>
          <span>0,00 €</span>
        </div>
        <div class="flex justify-between font-bold">
          <span>Total IVA incluido</span>
          <span>{{ '€ ' + total }}</span>
        </div>
      </div>

      <div class="mb-4">
        <h3 class="text-xl font-bold">Código de Descuento</h3>
        <div class="flex">
          <input
            type="text"
            [(ngModel)]="discountCode"
            placeholder="Introduce tu código"
            class="p-2 border rounded-l"
          />
          <button
            (click)="applyDiscount()"
            class="bg-orange-500 text-white px-4 py-2 rounded-r"
          >
            Aplicar
          </button>
        </div>
        <p *ngIf="discountApplied" class="text-green-500 mt-2">
          ¡Descuento aplicado! 10% de descuento en tu compra.
        </p>
        <p *ngIf="discountError" class="text-red-500 mt-2">
          {{ discountError }}
        </p>
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
          (click)="nextStep()"
          class="bg-orange-500 text-white px-4 py-2 rounded"
        >
          Confirmar y Pagar
        </button>
      </div>
    </div>
  `,
  styles: [],
})
export class PaymentConfirmationComponent {
  cartItems: any[];
  total: number;
  discountCode: string = '';
  discountApplied: boolean = false;
  discountError: string | null = null;
  user: { firstName: string; lastName: string; email: string } | null = null;

  constructor(
    private router: Router,
    private cartService: CartService,
    private authService: AuthService // Inject AuthService
  ) {
    this.cartItems = this.cartService.cart();
    this.total = this.cartItems.reduce((sum, item) => sum + item.price, 0);
    this.loadUserData();
  }

  loadUserData() {
    const currentUser = this.authService.getCurrentUser();
    if (currentUser) {
      const users = this.authService.getUsers();
      const userData = users[currentUser];
      if (userData) {
        this.user = {
          firstName: userData.firstName,
          lastName: userData.lastName,
          email: userData.email,
        };
      }
    }
  }

  applyDiscount() {
    const currentUser = this.authService.getCurrentUser();
    const discountUsed = localStorage.getItem(`discountUsed_${currentUser}`);

    if (discountUsed) {
      this.discountError = 'El código de descuento ya ha sido utilizado.';
      this.discountApplied = false;
    } else if (this.discountCode === 'NUEVO10') {
      this.total = this.total * 0.9;
      this.discountApplied = true;
      this.discountError = null;
      localStorage.setItem(`discountUsed_${currentUser}`, 'true');
    } else {
      this.discountError = 'Código de descuento no válido';
      this.discountApplied = false;
    }
  }

  nextStep() {
    this.router.navigate(['/payment/done']);
  }

  previousStep() {
    this.router.navigate(['/payment/method']);
  }
}