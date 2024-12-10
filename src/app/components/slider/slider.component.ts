import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-slider',
  standalone: true,
  imports: [CommonModule], 
  template: `
    <div class="slider-container mt-6">
      <div class="slider" [style.transform]="'translateX(' + (-currentIndex * 100) + '%)'">
        <div 
          class="slide" 
          *ngFor="let slide of slides"
          [style.backgroundColor]="slide.backgroundColor"
        >
          <div class="slide-content">
            <h2>{{ slide.slogan }}</h2>
            <p>{{ slide.description }}</p>
          </div>
        </div>
      </div>
      <div class="slider-controls">
        <button class="prev" (click)="prevSlide()"><</button>
        <button class="next" (click)="nextSlide()">></button>
      </div>
    </div>
  `,
  styles: [
    `
      .slider-container {
        position: relative;
        overflow: hidden;
        width: 100%;
        max-width: 1200px;
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
      .slide-content h2 {
        font-size: 2rem;
        font-weight: bold;
      }
      .slide-content p {
        font-size: 1rem;
      }
      .slider-controls {
        position: absolute;
        top: 50%;
        width: 100%;
        display: flex;
        justify-content: space-between;
        transform: translateY(-50%);
      }
      button {
        background: rgba(0, 0, 0, 0.5);
        color: white;
        border: none;
        padding: 10px;
        cursor: pointer;
      }
      button:hover {
        background: rgba(0, 0, 0, 0.8);
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
      imageUrl: '/slide1.jpg' // Ruta de la imagen en la carpeta public
      
    }, 
    { 
      slogan: 'Disfruta de las fiestas', 
      description: 'Descuentos únicos solo hoy', 
      backgroundColor: '#3f51b5',
      imageUrl: '/slide2.jpg' // Ruta de la imagen en la carpeta public
    }, 
    { 
      slogan: 'Nuevas llegadas', 
      description: 'Los mejores regalos con descuento', 
      backgroundColor: '#4caf50',
      imageUrl: '/slide3.jpg' // Ruta de la imagen en la carpeta public
    }
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
