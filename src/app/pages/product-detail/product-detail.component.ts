import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ProductsService } from '../../services/products.service';
import { Product } from '../../models/products.models';
import { CartService } from '../../services/cart.service';
import { PrimaryButtonComponent } from '../../components/primary-button/primary-button.component';
import { MatIconModule } from '@angular/material/icon';
import Swal from 'sweetalert2';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [PrimaryButtonComponent, MatIconModule],
  template: `
    <div
      class="bg-white shadow-md border rounded-xl p-6 flex flex-col gap-6 max-w-xl mx-auto mt-8 mb-8 " 
    >
      <button (click)="goBack()" class="back-button mb-4 flex items-center">
        <mat-icon>arrow_back</mat-icon>
        <span class="ml-2">Volver</span>
      </button>
      <div class="mx-auto">
        <img [src]="product?.image" class="w-[300px] h-[auto] object-contain" />
      </div>
      <div class="flex flex-col">
        <h2 class="text-2xl font-bold">{{ product?.title }}</h2>
        <p class="text-lg font-semibold">{{ '$' + product?.price }}</p>

        <p class="text-sm text-gray-500 mt-4">{{ product?.description }}</p>

        <div class="mt-4">
          <p class="text-md font-bold">
            Rating: {{ product?.rating?.rate }} / 5
          </p>
          <p class="text-sm text-gray-500">
            Basado en {{ product?.rating?.count }} reviews
          </p>

          <!-- Botón para añadir al carrito -->
          <app-primary-button
            label="Añadir a la cesta"
            class="mt-2 w-full text-lg font-bold py-3  hover:text-white transition-colors duration-300"
            (btnClicked)="addToCart()"
          />
        </div>
      </div>
    </div>
  `,
  styles: [`
    .back-button {
      color: #f97316; /* Cambia el color aquí */
      background: none;
      border: none;
      cursor: pointer;
      font-size: 16px;
    }
    
  `],
})
export class ProductDetailComponent implements OnInit {
  product: Product | undefined;

  // Inyecta el servicio del carrito
  CartService = inject(CartService);

  constructor(
    private route: ActivatedRoute,
    private productsService: ProductsService,
    private location: Location
  ) {}

  ngOnInit(): void {
    const productId = this.route.snapshot.paramMap.get('id');
    if (productId) {
      this.productsService
        .getProductDetails(Number(productId))
        .pipe(
          catchError(error => {
            console.error('Error al cargar el producto:', error);
            return of(undefined);
          })
        )
        .subscribe(product => {
          this.product = product;
        });
    }
  }

  // Método para añadir el producto al carrito
  addToCart() {
    if (this.product) {
      this.CartService.addToCart(this.product);
      Swal.fire({
        title: 'Producto añadido',
        text: `El producto "${this.product.title}" ha sido añadido a la cesta.`,
        icon: 'success',
        confirmButtonText: 'OK'
      });
    }
  }

  // Método para regresar a la página anterior
  goBack() {
    this.location.back();
  }
}