import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-promo-banner',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="promo-banner bg-gradient-to-r from-orange-400 via-red-500 to-pink-500 text-white py-4 px-6 text-center">
      <p class="text-lg font-semibold">¡Si eres nuevo, consigue un 10% de descuento con el código <span class="font-bold">NUEVO10</span>!</p>
    </div>
  `,
  styles: [
    `
      .promo-banner {
        background: linear-gradient(90deg, #FF385C 0%, #F799BA 100%);
        color: #ffffff;
        padding: 1rem;
        text-align: center;
        font-size: 1.25rem;
        font-weight: 600;
      }
    `,
  ],
})
export class PromoBannerComponent {}