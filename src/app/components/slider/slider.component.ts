import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-slider',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      class="slider-container mt-6 relative overflow-hidden w-full"
      (touchstart)="onTouchStart($event)"
      (touchmove)="onTouchMove($event)"
      (touchend)="onTouchEnd()"
    >
      <div
        class="slider flex transition-transform duration-500 ease-in-out"
        [style.transform]="'translateX(' + (-currentIndex * 100) + '%)'"
      >
        <div
          class="slide flex flex-col md:flex-row items-center justify-between w-full px-4 md:px-6 py-4 relative"
          *ngFor="let slide of slides; let i = index"
          [style.background]="i === 0 ? 'linear-gradient(90deg, #FF5733 0%, #FFC300 100%)' : getGradient(slide.backgroundColor)"
        >
          <!-- Overlay -->
          <div class="overlay absolute inset-0 bg-black opacity-50"></div>

          <!-- Imagen -->
          <div class="w-full md:w-1/2 flex justify-center relative z-10">
            <img
              [src]="slide.imageUrl"
              alt="Slider Image"
              class="rounded-lg w-full max-w-xs md:max-w-sm lg:max-w-md max-h-100 md:max-h-80 lg:max-h-64 object-cover"
            />
          </div>

          <!-- Contenido -->
          <div
            class="text-center md:text-left w-full md:w-1/2 flex flex-col items-center md:items-start mt-4 md:mt-0 md:ml-6 max-w-[90%] mx-auto relative z-10"
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
      .overlay {
        position: absolute;
        inset: 0;
        background-color: black;
        opacity: 0.2;
        z-index: 1;
      }
      .slider-controls {
        position: absolute;
        top: 50%;
        width: 100%;
        display: flex;
        justify-content: space-between;
        transform: translateY(-50%);
      }
      .slider-indicators {
        position: absolute;
        bottom: 0.5rem; /* Ajuste para dispositivos móviles */
        left: 50%;
        transform: translateX(-50%);
        display: flex;
        gap: 0.5rem;
      }
      @media (min-width: 768px) {
        .slider-indicators {
          bottom: 1rem; /* Ajuste para dispositivos más grandes */
        }
      }
      .indicator {
        width: 0.75rem;
        height: 0.75rem;
        border-radius: 50%;
        background-color: #ccc;
        cursor: pointer;
      }
      .indicator.bg-white {
        background-color: white;
      }
      .indicator.bg-gray-500 {
        background-color: #6b7280;
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
  startX = 0;
  currentX = 0;
  isDragging = false;

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

  goToSlide(index: number) {
    this.currentIndex = index;
  }

  get currentSlide() {
    return this.slides[this.currentIndex];
  }

  getGradient(color: string): string {
    return `linear-gradient(90deg, ${color} 0%, ${this.lightenColor(color, 0.5)} 100%)`;
  }

  lightenColor(color: string, percent: number): string {
    const num = parseInt(color.replace("#", ""), 16),
      amt = Math.round(2.55 * percent * 100),
      R = (num >> 16) + amt,
      G = ((num >> 8) & 0x00ff) + amt,
      B = (num & 0x0000ff) + amt;
    return (
      "#" +
      (0x1000000 +
        (R < 255 ? (R < 1 ? 0 : R) : 255) * 0x10000 +
        (G < 255 ? (G < 1 ? 0 : G) : 255) * 0x100 +
        (B < 255 ? (B < 1 ? 0 : B) : 255))
        .toString(16)
        .slice(1)
    );
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.updateSliderPosition();
  }

  onTouchStart(event: TouchEvent) {
    this.startX = event.touches[0].clientX;
    this.isDragging = true;
  }

  onTouchMove(event: TouchEvent) {
    if (!this.isDragging) return;
    this.currentX = event.touches[0].clientX;
  }

  onTouchEnd() {
    if (!this.isDragging) return;
    const diffX = this.startX - this.currentX;
    if (diffX > 50) {
      this.nextSlide();
    } else if (diffX < -50) {
      this.prevSlide();
    }
    this.isDragging = false;
  }

  updateSliderPosition() {
    const slider = document.querySelector('.slider') as HTMLElement;
    if (slider) {
      slider.style.transform = `translateX(-${this.currentIndex * 100}%)`;
    }
  }
}