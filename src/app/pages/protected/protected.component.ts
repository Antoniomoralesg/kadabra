import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import confetti from 'canvas-confetti';

@Component({
  selector: 'app-protected',
  template: `
    <div class="protected-container">
      <div class="content-container">
        <h2 class="text-2xl font-bold mb-6 text-center">¡Enhorabuena!</h2>
        <p class="text-center">
          Te has registrado con éxito y ahora puedes comprar sin problemas.
        </p>
        <div class="mt-4 text-center">
          <a
            routerLink="/"
            class="text-orange-500 hover:text-orange-600 font-semibold hover:underline"
            >Volver a la página inicial</a
          >
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .protected-container {
        display: flex;
        align-items: center;
        justify-content: center;
        min-height: 100vh;
        background-image: url('/protected.jpg'); /* Ruta de la imagen */
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
      }
      .content-container {
        background-color: rgba(255, 255, 255, 0.9); /* Fondo semitransparente */
        padding: 2rem;
        border-radius: 0.5rem;
        box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.1);
        max-width: 400px;
        width: 100%;
      }
    `
  ],
  standalone: true,
  imports: [RouterModule],
})
export class ProtectedComponent implements OnInit {
  ngOnInit() {
    this.launchConfetti();
  }

  launchConfetti() {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });
  }
}