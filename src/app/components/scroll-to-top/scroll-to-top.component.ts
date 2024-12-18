import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-scroll-to-top',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button
      *ngIf="isVisible"
      (click)="scrollToTop()"
      class="fixed bottom-4 right-4 bg-orange-500 text-white p-3 rounded-full shadow-lg "
    >
      ↑ Subir
    </button>
  `,
  styles: [
    `
      button {
        display: block;
      }
    `
  ]
})
export class ScrollToTopComponent {
  isVisible = false;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrollPosition = window.pageYOffset + window.innerHeight;
    const threshold = document.documentElement.scrollHeight - 100; // Ajusta el umbral según sea necesario
    this.isVisible = scrollPosition >= threshold;
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}