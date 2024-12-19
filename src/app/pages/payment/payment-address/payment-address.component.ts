import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-payment-address',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './payment-address.component.html',
  styleUrls: ['./payment-address.component.css'],
})
export class PaymentAddressComponent {
  address = '';
  postalCode = '';
  city = '';
  country = 'España';
  phone = '';

  constructor(private router: Router) {}

  nextStep() {
    this.router.navigate(['/payment/method']);
  }

  previousStep() {
    this.router.navigate(['/cart']);
  }
}