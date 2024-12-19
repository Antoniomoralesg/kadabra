import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-scroll-to-top',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './scroll-to-top.component.html',
  styleUrls: ['./scroll-to-top.component.css'],
})
export class ScrollToTopComponent {
  isVisible = false;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrollPosition = window.pageYOffset + window.innerHeight;
    const threshold = document.documentElement.scrollHeight - 100;
    this.isVisible = scrollPosition >= threshold;
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}