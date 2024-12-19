import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-slider',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css'],
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
    return `linear-gradient(90deg, ${color} 0%, ${this.lightenColor(
      color,
      0.5
    )} 100%)`;
  }

  lightenColor(color: string, percent: number): string {
    const num = parseInt(color.replace('#', ''), 16),
      amt = Math.round(2.55 * percent * 100),
      R = (num >> 16) + amt,
      G = ((num >> 8) & 0x00ff) + amt,
      B = (num & 0x0000ff) + amt;
    return (
      '#' +
      (
        0x1000000 +
        (R < 255 ? (R < 1 ? 0 : R) : 255) * 0x10000 +
        (G < 255 ? (G < 1 ? 0 : G) : 255) * 0x100 +
        (B < 255 ? (B < 1 ? 0 : B) : 255)
      )
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