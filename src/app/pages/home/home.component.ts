import { Component } from '@angular/core';
import { ProductsListComponent } from '../products-list/products-list.component';
import { SliderComponent } from '../../components/slider/slider.component';
import { StoreBenefitsComponent } from '../../components/store-benefits/store-benefits.component';
import { UserReviewsComponent } from '../../components/user-reviews/user-reviews.component';
import { NewsletterComponent } from '../../components/newsletter/newsletter.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ProductsListComponent, SliderComponent, StoreBenefitsComponent, UserReviewsComponent, NewsletterComponent],
  template: `
    <app-slider></app-slider>
    <app-products-list></app-products-list>
    <app-store-benefits></app-store-benefits>
    <app-user-reviews></app-user-reviews>
    <app-newsletter></app-newsletter>
  `,
  styles: []
})
export class HomeComponent {}