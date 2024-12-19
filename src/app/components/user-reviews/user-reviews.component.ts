import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-reviews',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './user-reviews.component.html',
  styleUrls: ['./user-reviews.component.css'],
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