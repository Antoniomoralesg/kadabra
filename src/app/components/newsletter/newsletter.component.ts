import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-newsletter',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './newsletter.component.html',
  styleUrls: ['./newsletter.component.css'],
})
export class NewsletterComponent {
  email = '';
  preferences = 'women';
  contentOptions = {
    discounts: false,
    news: false,
    inspiration: false,
  };

  onSubmit() {
    // suscripción a la newsletter
    Swal.fire({
      title: 'Suscripción exitosa',
      text: `Gracias por suscribirte con el correo: ${this.email}`,
      icon: 'success',
      confirmButtonText: 'OK',
    });
    this.email = '';
  }
}