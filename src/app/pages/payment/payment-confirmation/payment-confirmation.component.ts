import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { CartService } from '../../../services/cart.service';
import { AuthService } from '../../../services/auth.service'; 

@Component({
  selector: 'app-payment-confirmation',
  standalone: true,
  imports: [CommonModule, FormsModule], 
  templateUrl: './payment-confirmation.component.html',
  styleUrls: ['./payment-confirmation.component.css'],
})
export class PaymentConfirmationComponent {
  cartItems: any[];
  total: number;
  discountCode: string = '';
  discountApplied: boolean = false;
  discountError: string | null = null;
  user: { firstName: string; lastName: string; email: string } | null = null;

  constructor(
    private router: Router,
    private cartService: CartService,
    private authService: AuthService // Inject AuthService
  ) {
    this.cartItems = this.cartService.cart();
    this.total = this.cartItems.reduce((sum, item) => sum + item.price, 0);
    this.loadUserData();
  }

  loadUserData() {
    const currentUser = this.authService.getCurrentUser();
    if (currentUser) {
      const users = this.authService.getUsers();
      const userData = users[currentUser];
      if (userData) {
        this.user = {
          firstName: userData.firstName,
          lastName: userData.lastName,
          email: userData.email,
        };
      }
    }
  }

  applyDiscount() {
    const currentUser = this.authService.getCurrentUser();
    const discountUsed = localStorage.getItem(`discountUsed_${currentUser}`);

    if (discountUsed) {
      this.discountError = 'El código de descuento ya ha sido utilizado.';
      this.discountApplied = false;
    } else if (this.discountCode === 'NUEVO10') {
      this.total = this.total * 0.9;
      this.discountApplied = true;
      this.discountError = null;
      localStorage.setItem(`discountUsed_${currentUser}`, 'true');
    } else {
      this.discountError = 'Código de descuento no válido';
      this.discountApplied = false;
    }
  }

  nextStep() {
    this.router.navigate(['/payment/done']);
  }

  previousStep() {
    this.router.navigate(['/payment/method']);
  }
}