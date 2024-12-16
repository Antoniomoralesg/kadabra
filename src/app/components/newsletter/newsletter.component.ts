import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-newsletter',
  standalone: true,
  imports: [FormsModule],
  template: `
    <div
      class="newsletter-container bg-white p-6 rounded shadow-md w-full max-w-4xl mx-auto mt-8"
    >
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 class="text-2xl font-bold mb-4">
            Ofertas, novedades y tendencias
          </h2>
          <p class="mb-4">Directo a tu correo</p>
          <p class="text-sm mb-4">
            Con nuestro selecto boletín te llegarán descuentos, novedades e
            inspiración para tu estilo.
          </p>
        </div>

        <!-- Formulario de suscripción -->
        <div>
          <form (ngSubmit)="onSubmit()" class="space-y-4">
            <div>
              <label for="email" class="block text-sm font-medium text-gray-700"
                >Tu correo electrónico</label
              >
              <input
                type="email"
                id="email"
                [(ngModel)]="email"
                name="email"
                required
                class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label
                for="preferences"
                class="block text-sm font-medium text-gray-700"
                >Gestiona tus preferencias</label
              >
              <select
                id="preferences"
                [(ngModel)]="preferences"
                name="preferences"
                class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                <option value="women">Moda para mujer</option>
                <option value="men">Moda para hombre</option>
                <option value="both">Ambos</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700"
                >Opciones de contenido</label
              >
              <div class="mt-2 space-y-2">
                <div>
                  <input
                    type="checkbox"
                    id="discounts"
                    [(ngModel)]="contentOptions.discounts"
                    name="discounts"
                    class="mr-2"
                  />
                  <label for="discounts" class="text-sm">Descuentos</label>
                </div>
                <div>
                  <input
                    type="checkbox"
                    id="news"
                    [(ngModel)]="contentOptions.news"
                    name="news"
                    class="mr-2"
                  />
                  <label for="news" class="text-sm">Novedades</label>
                </div>
                <div>
                  <input
                    type="checkbox"
                    id="inspiration"
                    [(ngModel)]="contentOptions.inspiration"
                    name="inspiration"
                    class="mr-2"
                  />
                  <label for="inspiration" class="text-sm">Inspiración</label>
                </div>
              </div>
            </div>
            <div>
              <button
                type="submit"
                class="w-full bg-orange-500 text-white py-2 px-4 rounded-md"
              >
                <i class="fas fa-envelope mr-2"></i> Suscríbeme
              </button>
            </div>
          </form>
          <p class="text-xs mt-4">
            Echa un vistazo a nuestra
            <a href="#" class="text-indigo-600 hover:text-indigo-900"
              >política de privacidad</a
            >
            para saber más sobre el procesamiento de tus datos. Puedes darte de
            baja cuando quieras, sin coste alguno.
          </p>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .newsletter-container {
        background-color: #fff;
        padding: 1.5rem;
        border-radius: 0.5rem;
        box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
        max-width: 56rem;
        margin: 2rem auto;
      }
    `,
  ],
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
