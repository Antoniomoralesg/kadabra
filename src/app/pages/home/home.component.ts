import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SliderComponent } from '../../components/slider/slider.component';
import { PromoBannerComponent } from '../../components/promo-banner/promo-banner.component';
import { ScrollToTopComponent } from '../../components/scroll-to-top/scroll-to-top.component';
import { ProductsListComponent } from '../products-list/products-list.component';
import { NewsletterComponent } from '../../components/newsletter/newsletter.component';
import { UserReviewsComponent } from '../../components/user-reviews/user-reviews.component';
import { StoreBenefitsComponent } from '../../components/store-benefits/store-benefits.component';
import { AppPromoBannerComponent } from '../../components/app-promo-banner/app-promo-banner.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    SliderComponent,
    PromoBannerComponent,
    ScrollToTopComponent,
    ProductsListComponent,
    StoreBenefitsComponent,
    UserReviewsComponent,
    AppPromoBannerComponent,
    NewsletterComponent,
  ],
})
export class HomeComponent implements OnInit {
  isDarkMode: boolean = false;

  constructor() {}

  ngOnInit(): void {
    // Verificar si el modo oscuro está habilitado en el almacenamiento local
    const darkMode = localStorage.getItem('darkMode');
    if (darkMode === 'true') {
      this.isDarkMode = true;
      document.body.classList.add('dark-mode');
    }
  }

  toggleDarkMode(): void {
    this.isDarkMode = !this.isDarkMode;
    if (this.isDarkMode) {
      document.body.classList.add('dark-mode');
      localStorage.setItem('darkMode', 'true');
    } else {
      document.body.classList.remove('dark-mode');
      localStorage.setItem('darkMode', 'false');
    }
  }
}