import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-reviews',
  imports: [CommonModule],
  standalone: true,
  template: `
    <div
      class="user-reviews m-5 p-5 bg-gradient-to-r from-orange-400 via-red-500 to-pink-500 rounded-lg shadow-lg flex flex-wrap gap-5 justify-center"
    >
      <h2 class="text-2xl font-bold mb-4 w-full text-center text-white">
        Reseñas de Usuarios
      </h2>
      <div
        *ngFor="let review of reviews"
        class="review bg-white border-2 border-orange-500 p-4 rounded-lg shadow-md flex flex-col items-center w-full sm:w-1/2 md:w-1/3 lg:w-1/4"
      >
        <img
          [src]="review.image"
          alt="{{ review.user }}"
          class="w-16 h-16 rounded-full mb-4"
        />
        <h3 class="text-xl font-semibold text-center">{{ review.user }}</h3>
        <p class="text-gray-700 text-center">{{ review.comment }}</p>
        <p class="text-yellow-500 text-center">
          Calificación: {{ review.rating }}/5
        </p>
      </div>
    </div>
  `,
  styles: [
    `
      .user-reviews {
        background: linear-gradient(to right, #ff7e5f, #feb47b);
        padding: 1.25rem;
        border-radius: 0.5rem;
        box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.1);
      }
      .review {
        background-color: #fff;
      }
    `,
  ],
})
export class UserReviewsComponent {
  reviews = [
    {
      user: 'María García',
      comment:
        '¡Excelente servicio! Los productos llegaron a tiempo y en perfectas condiciones. Muy satisfecho con mi compra.',
      rating: 5,
      image: '/user1.jpg',
    },
    {
      user: 'Pedro Sanchez',
      comment:
        'Gran variedad de productos y precios competitivos. La atención al cliente es excepcional. ¡Recomendado!',
      rating: 5,
      image: '/user2.jpg',
    },
    {
      user: 'Carla Bruni',
      comment:
        'La experiencia de compra fue muy fácil y rápida. Definitivamente volveré a comprar aquí.',
      rating: 5,
      image: '/user3.jpg',
    },
  ];
}
