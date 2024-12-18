import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-app-promo-banner',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      class="promo-banner flex items-center p-4 bg-white shadow-lg rounded-lg"
    >
      <div class="text-content flex-1">
        <h2 class="text-2xl font-bold mb-2">¿Has probado nuestra app?</h2>
        <p class="text-lg mb-2">★★★★★</p>
        <p class="text-md mb-4">
          Encuentra más rápido y más fácil tus looks y marcas preferidas. Navega
          más a tu estilo por nuestras categorías Streetwear, Designer o
          Deporte.
        </p>
        <a href="#" class="text-orange-500 font-semibold hover:underline"
          >Descubre más sobre nuestra app</a
        >
      </div>
      <div class="image-content flex-1">
        <img
          src="/promo.jpg"
          alt="Promo App"
          class="w-full h-auto object-contain rounded-lg shadow-md"
        />
      </div>
    </div>
  `,
  styles: [
    `
      .promo-banner {
        display: flex;
        align-items: center;
        padding: 1rem;
        background-color: white;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        border-radius: 0.5rem;
      }
      .text-content {
        flex: 1;
        margin-right: 1rem;
      }
      .image-content {
        flex: 1;
      }
      @media (max-width: 640px) {
        .promo-banner {
          flex-direction: column;
          text-align: center;
        }
        .text-content {
          margin-right: 0;
          margin-bottom: 1rem;
        }
      }
    `,
  ],
})
export class AppPromoBannerComponent {}
