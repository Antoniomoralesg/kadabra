import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-store-benefits',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="benefits-container py-8 px-4 bg-gray-100">
      <h2 class="text-center text-3xl font-bold mb-6">Por qué elegirnos</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="benefit-card bg-white p-6 shadow-md rounded-lg text-center">
          <img src="/free.png" alt="Envíos gratis" class="h-24 mx-auto mb-4"/>
          <h3 class="text-xl font-semibold mb-2">Envíos Gratis</h3>
          <p>Disfruta de envío gratuito en todos tus pedidos. ¡Sin mínimos!</p>
        </div>
        <div class="benefit-card bg-white p-6 shadow-md rounded-lg text-center">
        <img src="/devo.png" alt="Envíos gratis" class="h-24 mx-auto mb-4"/>
          <h3 class="text-xl font-semibold mb-2">Devoluciones 100%</h3>
          <p>Si no te gusta, puedes devolverlo sin problemas. ¡Fácil y rápido!</p>
        </div>
        <div class="benefit-card bg-white p-6 shadow-md rounded-lg text-center">
        <img src="/apoyo.png" alt="Envíos gratis" class="h-24 mx-auto mb-4"/>
          <h3 class="text-xl font-semibold mb-2">Soporte al Cliente 24/7</h3>
          <p>Te atendemos a cualquier hora. ¡Estamos siempre disponibles para ayudarte!</p>
        </div>
      </div>
    </div>
  `,
 styles: [
  `
    .benefits-container {
      background-color: white;
    }
    .benefit-card {
      border: 2px solid #FFA500; /* Color naranja */
      border-radius: 8px; /* Opcional, para bordes redondeados */
      padding: 10px; /* Espaciado interno */
    }
    .benefit-card img {
      object-fit: contain;
    }
    .benefit-card:hover {
      transform: scale(1.05);
      transition: all 0.3s ease-in-out;
    }
  `,
],

})
export class StoreBenefitsComponent {}
