import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-slider',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="slider-container mt-6 relative overflow-hidden w-full">
      <div
        class="slider flex transition-transform duration-500 ease-in-out"
        [style.transform]="'translateX(' + (-currentIndex * 100) + '%)'"
      >
        <div
          class="slide flex flex-col md:flex-row items-center justify-between w-full px-4 md:px-6 py-4"
          *ngFor="let slide of slides"
          [style.backgroundColor]="slide.backgroundColor"
        >
          <!-- Imagen -->
          <div class="w-full md:w-1/2 flex justify-center">
            <img
              [src]="slide.imageUrl"
              alt="Slider Image"
              class="rounded-lg w-full max-w-xs md:max-w-sm lg:max-w-md max-h-100 md:max-h-80 lg:max-h-64 object-cover"
            />
          </div>

          <!-- Contenido -->
          <div
            class="text-center md:text-left w-full md:w-1/2 flex flex-col items-center md:items-start mt-4 md:mt-0 md:ml-6 max-w-[90%] mx-auto"
          >
            <h2 class="text-xl md:text-3xl font-bold text-white mb-2">
              {{ slide.slogan }}
            </h2>
            <p class="text-sm md:text-base text-white">{{ slide.description }}</p>
          </div>
        </div>
      </div>

      <!-- Controles -->
      <div
        class="slider-controls absolute top-1/2 transform -translate-y-1/2 w-full flex justify-between"
      >
        <button
          class="prev bg-gray-700 text-white px-3 py-1 rounded-full hover:bg-gray-900 focus:outline-none"
          (click)="prevSlide()"
        >
          ‹
        </button>
        <button
          class="next bg-gray-700 text-white px-3 py-1 rounded-full hover:bg-gray-900 focus:outline-none"
          (click)="nextSlide()"
        >
          ›
        </button>
      </div>
    </div>
  `,
  styles: [
    `
      .slider-container {
        position: relative;
        overflow: hidden;
        width: 100%;
        margin: auto;
      }
      .slider {
        display: flex;
        transition: transform 0.5s ease-in-out;
      }
      .slide {
        min-width: 100%;
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
        padding: 20px;
        color: white;
      }
      .slider-controls {
        position: absolute;
        top: 50%;
        width: 100%;
        display: flex;
        justify-content: space-between;
        transform: translateY(-50%);
      }
    `,
  ],
})
export class SliderComponent {
  slides = [
    {
      slogan: '¡Ofertas mágicas!',
      description: 'Encuentra lo mejor para ti',
      backgroundColor: '#f44336',
      imageUrl: '/slide1.jpg',
    },
    {
      slogan: 'Disfruta de las fiestas',
      description: 'Descuentos únicos solo hoy',
      backgroundColor: '#3f51b5',
      imageUrl: '/slide2.jpg',
    },
    {
      slogan: 'Nuevas llegadas',
      description: 'Los mejores regalos con descuento',
      backgroundColor: '#4caf50',
      imageUrl: '/slide3.jpg',
    },
  ];

  currentIndex = 0;

  nextSlide() {
    if (this.currentIndex < this.slides.length - 1) {
      this.currentIndex++;
    } else {
      this.currentIndex = 0;
    }
  }

  prevSlide() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    } else {
      this.currentIndex = this.slides.length - 1;
    }
  }

  get currentSlide() {
    return this.slides[this.currentIndex];
  }
}
