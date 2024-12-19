import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
})
export class PaymentComponent {
  isActive(step: string): boolean {
    const url = window.location.href;
    return url.includes(step);
  }
}