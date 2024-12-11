import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  template: `
    <footer class="bg-gray-800 text-white py-8">
      <div class="container mx-auto text-center">
        <p class="text-sm mb-2">&copy; 2024 Angular Ecommerce. Todos los derechos reservados.</p>
        <p class="text-xs mb-4">Diseñado por Antonio Morales</p>
        <div class="flex justify-center gap-6 flex-wrap">
          <a href="#" class="text-white hover:text-gray-400 transition-colors">Facebook</a>
          <a href="#" class="text-white hover:text-gray-400 transition-colors">Instagram</a>
          <a href="#" class="text-white hover:text-gray-400 transition-colors">X</a>
        </div>
      </div>
    </footer>
  `,
  styles: [
    `
      footer {
        background-color: #2d3748; /* bg-gray-800 */
        color: white;
      }
      footer a {
        transition: color 0.3s ease;
      }
      footer a:hover {
        color: #e2e8f0; /* hover:text-gray-400 */
      }
    `
  ]
})
export class FooterComponent {}
