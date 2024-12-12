import { Component } from '@angular/core';
import { ProductsListComponent } from '../products-list/products-list.component';
import { SliderComponent } from '../../components/slider/slider.component';
import { StoreBenefitsComponent } from '../../components/store-benefits/store-benefits.component';
import { UserReviewsComponent } from '../../components/user-reviews/user-reviews.component';
import { SalesChartComponent } from '../../components/sales-chart/sales-chart.component';
import { SalesIndicatorsComponent } from '../../components/sales-indicators/sales-indicators.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ProductsListComponent, SliderComponent, StoreBenefitsComponent, UserReviewsComponent, SalesChartComponent, SalesIndicatorsComponent],
  template: `
    <app-slider></app-slider>
    <app-products-list></app-products-list>
    <app-sales-chart></app-sales-chart>
    <app-sales-indicators></app-sales-indicators>
    <app-store-benefits></app-store-benefits>
    <app-user-reviews></app-user-reviews>
    
  `,
  styles: []
})
export class HomeComponent {

}
