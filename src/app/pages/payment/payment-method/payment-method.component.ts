import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { loadStripe } from '@stripe/stripe-js';

@Component({
  selector: 'app-payment-method',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './payment-method.component.html',
  styleUrls: ['./payment-method.component.css'],
})
export class PaymentMethodComponent implements OnInit {
  stripe: any;
  card: any;
  paymentMethod = 'creditCard';

  constructor(private router: Router) {}

  async ngOnInit() {
    this.stripe = await loadStripe('pk_test_51QjebjLZ3FT4ueSsu79j0N04DwXG60ZRgABE46cKo291DMRBtPPOSNsfelSDlL7EA9bSA6v4R9QJ608W1IElyTsh001RfoF8QH'); // Reemplaza con tu clave pública de Stripe

    if (!this.stripe) {
      console.error('Stripe.js no se ha cargado correctamente.');
      return;
    }

    const elements = this.stripe.elements();
    this.card = elements.create('card');
    this.card.mount('#card-element');

    console.log('Stripe y elementos de pago se han cargado correctamente.');
  }

  async handlePayment(event: Event) {
    event.preventDefault();

    const { token, error } = await this.stripe.createToken(this.card);

    if (error) {
      console.error('Error creating token:', error);
    } else {
      console.log('Token created:', token);
      // Aquí puedes enviar el token al servidor para procesar el pago
      this.nextStep();
    }
  }

  nextStep() {
    this.router.navigate(['/payment/confirmation']);
  }

  previousStep() {
    this.router.navigate(['/payment/address']);
  }
}