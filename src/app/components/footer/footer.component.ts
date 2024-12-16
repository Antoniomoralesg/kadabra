import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  template: `
    <footer class="bg-gray-900 text-white py-10">
      <div
        class="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left"
      >
        <!-- About Section -->
        <div>
          <h3 class="text-lg font-semibold mb-4">Sobre Nosotros</h3>
          <p class="text-sm">
            Kadabra es una tienda moderna que ofrece los mejores productos al
            mejor precio. Tu satisfacción es nuestra prioridad.
          </p>
        </div>

        <!-- Quick Links -->
        <div>
          <h3 class="text-lg font-semibold mb-4">Enlaces Rápidos</h3>
          <ul class="text-sm grid grid-cols-2 gap-4">
            <li>
              <a href="#" class="hover:text-gray-400 transition-colors"
                >Inicio</a
              >
            </li>
            <li>
              <a href="/products" class="hover:text-gray-400 transition-colors"
                >Productos</a
              >
            </li>
            <li>
              <a href="#" class="hover:text-gray-400 transition-colors"
                >Contacto</a
              >
            </li>
            <li>
              <a href="#" class="hover:text-gray-400 transition-colors">FAQs</a>
            </li>
          </ul>
        </div>

        <!-- Social Media -->
        <div>
          <h3 class="text-lg font-semibold mb-4">Síguenos</h3>
          <div class="flex justify-center md:justify-start gap-4">
            <a href="#" class="text-gray-400 hover:text-yellow-400 transition">
              <i class="fab fa-facebook-f text-2xl"></i>
            </a>
            <a href="#" class="text-gray-400 hover:text-yellow-400 transition">
              <i class="fab fa-instagram text-2xl"></i>
            </a>
            <a href="#" class="text-gray-400 hover:text-yellow-400 transition">
              <i class="fab fa-x-twitter text-2xl"></i>
            </a>
          </div>
        </div>
      </div>
    </footer>
  `,
  styles: [
    `
      footer {
        background-color: #1a202c;
        color: #e2e8f0;
      }
      footer a {
        transition: color 0.3s ease;
      }
      footer a:hover {
        color: #facc15;
      }
      footer i {
        transition: transform 0.3s ease;
      }
      footer i:hover {
        transform: scale(1.2);
      }
    `,
  ],
})
export class FooterComponent {}
