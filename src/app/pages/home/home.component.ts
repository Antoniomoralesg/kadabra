import { Component } from '@angular/core';
import { ProductsListComponent } from '../products-list/products-list.component';
import { SliderComponent } from '../../components/slider/slider.component';
import { StoreBenefitsComponent } from '../../components/store-benefits/store-benefits.component';
import { UserReviewsComponent } from '../../components/user-reviews/user-reviews.component';
import { NewsletterComponent } from '../../components/newsletter/newsletter.component';
import { PromoBannerComponent } from '../../components/promo-banner/promo-banner.component';
import { AppPromoBannerComponent } from "../../components/app-promo-banner/app-promo-banner.component";
import { ScrollToTopComponent } from '../../components/scroll-to-top/scroll-to-top.component';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    ProductsListComponent,
    SliderComponent,
    StoreBenefitsComponent,
    UserReviewsComponent,
    NewsletterComponent,
    PromoBannerComponent,
    ProductsListComponent,
    PromoBannerComponent,
    AppPromoBannerComponent,
    ScrollToTopComponent
    
],
  template: `
    <app-slider></app-slider>
    <app-promo-banner></app-promo-banner>
    <app-scroll-to-top></app-scroll-to-top>
    <app-products-list></app-products-list>
    <app-store-benefits></app-store-benefits>
    <app-user-reviews></app-user-reviews>
    <app-app-promo-banner></app-app-promo-banner>
    <app-newsletter></app-newsletter>
    
  `,
  styles: [],
})
export class HomeComponent {}
