import { Component } from '@angular/core';

@Component({
  selector: 'app-faqs',
  template: `
    <div class="container mx-auto p-6">
      <h2 class="text-2xl font-bold mb-4">Preguntas Frecuentes</h2>
      <div class="faq-item mb-4">
        <h3 class="text-xl font-semibold"><i class="fas fa-shopping-cart mr-2 text-orange-500"></i>¿Cómo puedo realizar un pedido?</h3>
        <p>Puedes realizar un pedido seleccionando los productos que deseas comprar y siguiendo el proceso de pago.</p>
      </div>
      <div class="faq-item mb-4">
        <h3 class="text-xl font-semibold"><i class="fas fa-shipping-fast mr-2 text-orange-500"></i>¿Cuáles son las opciones de envío?</h3>
        <p>Ofrecemos envío estándar y envío premium. Puedes seleccionar la opción que prefieras durante el proceso de pago.</p>
      </div>
      <div class="faq-item mb-4">
        <h3 class="text-xl font-semibold"><i class="fas fa-undo-alt mr-2 text-orange-500"></i>¿Cómo puedo devolver un producto?</h3>
        <p>Puedes devolver un producto dentro de los 30 días posteriores a la compra. Simplemente sigue las instrucciones en nuestra página de devoluciones.</p>
      </div>
      <div class="faq-item mb-4">
        <h3 class="text-xl font-semibold"><i class="fas fa-credit-card mr-2 text-orange-500"></i>¿Qué métodos de pago aceptan?</h3>
        <p>Aceptamos tarjetas de crédito, débito, PayPal y transferencias bancarias.</p>
      </div>
      <div class="faq-item mb-4">
        <h3 class="text-xl font-semibold"><i class="fas fa-lock mr-2 text-orange-500"></i>¿Es seguro comprar en su sitio web?</h3>
        <p>Sí, utilizamos tecnología de encriptación SSL para garantizar que tu información personal y de pago esté segura.</p>
      </div>
      <div class="faq-item mb-4">
        <h3 class="text-xl font-semibold"><i class="fas fa-question-circle mr-2 text-orange-500"></i>¿Cómo puedo contactar con el servicio de atención al cliente?</h3>
        <p>Puedes contactar con nuestro servicio de atención al cliente a través de nuestro formulario de contacto, correo electrónico o llamando a nuestro número de teléfono.</p>
      </div>
    </div>
  `,
  styles: []
})
export class FaqsComponent {}