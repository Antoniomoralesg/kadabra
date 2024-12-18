import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [RouterModule],
  template: `
    <div class="bg-white p-6 rounded-xl shadow-xl border">
      <h2 class="text-2xl mb-4 font-bold">Pasarela de Pago</h2>
      <div class="flex justify-between mb-4 progress-bar">
        <div [class.active]="isActive('address')">Dirección</div>
        <div [class.active]="isActive('method')">Pago</div>
        <div [class.active]="isActive('confirmation')">Confirmación</div>
        <div [class.active]="isActive('done')">¡Hecho!</div>
      </div>
      <router-outlet></router-outlet>
    </div>
  `,
  styles: [
    `
      .progress-bar div {
        flex: 1;
        text-align: center;
        padding: 0.5rem;
        border-bottom: 2px solid #ccc;
        
      }
      .progress-bar div.active {
        border-bottom: 5px solid #ff9800;
        font-weight: bold;
      }
    `,
  ],
})
export class PaymentComponent {
  isActive(step: string): boolean {
    const url = window.location.href;
    return url.includes(step);
  }
}
