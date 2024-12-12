import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgChartsModule } from 'ng2-charts';
import { ChartConfiguration, ChartType } from 'chart.js';

@Component({
  selector: 'app-sales-chart',
  standalone: true,
  imports: [CommonModule, NgChartsModule],
  template: `
    <div class="sales-chart-container m-5">
      <h2 class="text-2xl font-bold mb-4 text-center">Estadísticas de Ventas</h2>
      <div class="chart-wrapper mx-auto" style="max-width: 600px;">
        <canvas baseChart
                [data]="barChartData"
                [options]="barChartOptions"
                [type]="barChartType">
        </canvas>
      </div>
      <p class="text-center mt-4 text-gray-700">
        Las ventas han mostrado un crecimiento constante durante los primeros seis meses del año, con un pico en marzo.
      </p>
    </div>
  `,
  styles: []
})
export class SalesChartComponent {
  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
  };
  public barChartType: ChartType = 'bar';
  public barChartData: ChartConfiguration['data'] = {
    labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio'],
    datasets: [
      { data: [65, 59, 80, 81, 56, 55, 40], label: 'Ventas 2023' }
    ]
  };
}
