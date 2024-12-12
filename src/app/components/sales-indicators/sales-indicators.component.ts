import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CountUpModule } from 'ngx-countup';
import { IntersectionObserverDirective } from '../../directives/intersection-observer.directive';

@Component({
  selector: 'app-sales-indicators',
  standalone: true,
  imports: [CommonModule, CountUpModule, IntersectionObserverDirective],
  template: `
    <div class="sales-indicators-container m-5">
      <h2 class="text-2xl font-bold mb-4 text-center">Indicadores de Ventas</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
        <div class="indicator bg-white p-6 shadow-md rounded-lg" appIntersectionObserver (visible)="animateTotalSales()">
          <h3 class="text-xl font-semibold mb-2"><i class="fas fa-dollar-sign text-orange-500"></i> Ventas Totales</h3>
          <count-up [endVal]="totalSales" [duration]="2" [startVal]="0" [reanimateOnClick]="true" #totalSalesCounter></count-up>
          <p class="text-green-500 mt-2">+{{ totalSalesIncrease }}%</p>
        </div>
        <div class="indicator bg-white p-6 shadow-md rounded-lg" appIntersectionObserver (visible)="animateSatisfiedCustomers()">
          <h3 class="text-xl font-semibold mb-2"><i class="fas fa-smile text-orange-500"></i> Clientes Satisfechos</h3>
          <count-up [endVal]="satisfiedCustomers" [duration]="2" [startVal]="0" [reanimateOnClick]="true" #satisfiedCustomersCounter></count-up>
          <p class="text-green-500 mt-2">+{{ satisfiedCustomersIncrease }}%</p>
        </div>
        <div class="indicator bg-white p-6 shadow-md rounded-lg" appIntersectionObserver (visible)="animateProductsSold()">
          <h3 class="text-xl font-semibold mb-2"><i class="fas fa-box text-orange-500"></i> Productos Vendidos</h3>
          <count-up [endVal]="productsSold" [duration]="2" [startVal]="0" [reanimateOnClick]="true" #productsSoldCounter></count-up>
          <p class="text-green-500 mt-2">+{{ productsSoldIncrease }}%</p>
        </div>
      </div>
    </div>
  `,
  styles: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SalesIndicatorsComponent {
  totalSales = 1500;
  totalSalesIncrease = 100000; // Porcentaje de aumento
  satisfiedCustomers = 1200;
  satisfiedCustomersIncrease = 8000; // Porcentaje de aumento
  productsSold = 3000;
  productsSoldIncrease = 12000; // Porcentaje de aumento

  animateTotalSales() {
    const totalSalesCounter = document.querySelector('#totalSalesCounter');
    if (totalSalesCounter) {
      totalSalesCounter.dispatchEvent(new Event('click'));
    }
  }

  animateSatisfiedCustomers() {
    const satisfiedCustomersCounter = document.querySelector('#satisfiedCustomersCounter');
    if (satisfiedCustomersCounter) {
      satisfiedCustomersCounter.dispatchEvent(new Event('click'));
    }
  }

  animateProductsSold() {
    const productsSoldCounter = document.querySelector('#productsSoldCounter');
    if (productsSoldCounter) {
      productsSoldCounter.dispatchEvent(new Event('click'));
    }
  }
}
