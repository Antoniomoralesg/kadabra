import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-payment-method',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './payment-method.component.html',
  styleUrls: ['./payment-method.component.css'],
})
export class PaymentMethodComponent {
  paymentMethod = 'creditCard';

  constructor(private router: Router) {}

  nextStep() {
    this.router.navigate(['/payment/confirmation']);
  }

  previousStep() {
    this.router.navigate(['/payment/address']);
  }
}