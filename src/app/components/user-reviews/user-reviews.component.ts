import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-reviews',
  imports: [CommonModule],
  standalone: true,
  template: `
    <div class="user-reviews m-5 flex flex-wrap gap-5 justify-center">
      <h2 class="text-2xl font-bold mb-4 w-full text-center">Reseñas de Usuarios</h2>
      <div *ngFor="let review of reviews" class="review border-2 border-orange-500 p-4 rounded-lg shadow-md flex flex-col items-center w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
        <img [src]="review.image" alt="{{ review.user }}" class="w-16 h-16 rounded-full mb-4">
        <h3 class="text-xl font-semibold text-center">{{ review.user }}</h3>
        <p class="text-gray-700 text-center">{{ review.comment }}</p>
        <p class="text-yellow-500 text-center">Calificación: {{ review.rating }}/5</p>
      </div>
    </div>
  `,
  styles: []
})
export class UserReviewsComponent {
  reviews = [
    { user: 'María García', comment: '¡Excelente servicio! Los productos llegaron a tiempo y en perfectas condiciones. Muy satisfecho con mi compra.', rating: 5, image: '/user1.jpg' },
    { user: 'Pedro Sanchez', comment: 'Gran variedad de productos y precios competitivos. La atención al cliente es excepcional. ¡Recomendado!', rating: 5, image: '/user2.jpg' },
    { user: 'Carla Bruni', comment: 'La experiencia de compra fue muy fácil y rápida. Definitivamente volveré a comprar aquí.', rating: 5, image: '/user3.jpg' }
  ];
}
