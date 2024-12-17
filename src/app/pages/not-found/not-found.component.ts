import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="not-found-container" style="background-image: url('404.jpg');">
      <div class="text-container">
        <h1>404 - Página no encontrada</h1>
        <p>Lo sentimos, la página que estás buscando no existe.</p>
        <a routerLink="/" class="back-home-button">Volver a la página principal</a>
      </div>
    </div>
  `,
  styles: [
    `
      .not-found-container {
        text-align: center;
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
        height: 100vh;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        color: white;
        text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7);
      }
      .text-container {
        background-color: rgba(0, 0, 0, 0.5); /* Fondo semitransparente */
        padding: 20px;
        border-radius: 10px;
      }
      .text-container h1 {
        font-size: 3rem; /* Aumentar tamaño del texto */
        margin-bottom: 10px;
      }
      .text-container p {
        font-size: 1.5rem; /* Aumentar tamaño del texto */
        margin-bottom: 20px;
      }
      .back-home-button {
        display: inline-block;
        margin-top: 20px;
        padding: 10px 20px;
        background-color: #f97316;
        color: white;
        text-decoration: none;
        border-radius: 5px;
        position: relative;
        top: -20px; /* Ajustar la posición del botón */
      }
      .back-home-button:hover {
        background-color: #e65c00;
      }
    `
  ]
})
export class NotFoundComponent {}