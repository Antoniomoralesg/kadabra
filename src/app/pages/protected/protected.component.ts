import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import confetti from 'canvas-confetti';

@Component({
  selector: 'app-protected',
  template: `
    <div class="flex items-center justify-center min-h-screen bg-gray-100">
      <div class="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 class="text-2xl font-bold mb-6 text-center">¡Enhorabuena!</h2>
        <p class="text-center">Te has registrado con éxito y ahora puedes comprar sin problemas.</p>
        <div class="mt-4 text-center">
          <a routerLink="/" class= "text-orange-500 hover:text-orange-600 font-semibold hover:underline">Volver a la página inicial</a>
        </div>
      </div>
    </div>
  `,
  styles: [],
  standalone: true,
  imports: [RouterModule]
})
export class ProtectedComponent implements OnInit {
  ngOnInit() {
    this.launchConfetti();
  }

  launchConfetti() {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  }
}