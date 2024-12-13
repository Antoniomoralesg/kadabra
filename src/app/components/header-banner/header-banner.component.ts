import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header-banner',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="header-banner text-white py-2 px-4 text-center">
      <p class="text-sm md:text-base font-semibold">
        Envío gratuito en pedidos superiores a 30 euros | Devoluciones gratis
      </p>
    </div>
  `,
  styles: [
    `
      .header-banner {
        background: linear-gradient(90deg, #FFD700 0%, #FFEA00 100%); /* Degradado amarillo */
        color: #000000; /* Texto negro para mejor legibilidad */
        padding: 0.5rem 1rem;
        text-align: center;
        font-size: 1rem;
        font-weight: 600;
      }
    `,
  ],
})
export class HeaderBannerComponent {}