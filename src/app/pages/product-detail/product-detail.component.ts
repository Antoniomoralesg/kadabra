import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ProductsService } from '../../services/products.service';
import { Product } from '../../models/products.models';
import { CartService } from '../../services/cart.service';
import { PrimaryButtonComponent } from '../../components/primary-button/primary-button.component';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';
import { ProductCardComponent } from '../products-list/product-card/product-card.component';
import Swal from 'sweetalert2';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [
    PrimaryButtonComponent,
    MatIconModule,
    MatProgressSpinnerModule,
    CommonModule,
    ProductCardComponent // Incluir ProductCardComponent en imports
  ],
  template: `
    <div
      class="bg-white shadow-md border rounded-xl p-6 flex flex-col gap-6 max-w-xl mx-auto mt-8 mb-8 "
    >
      <button (click)="goBack()" class="back-button mb-4 flex items-center">
        <mat-icon>arrow_back</mat-icon>
        <span class="ml-2">Volver</span>
      </button>
      <div *ngIf="loading; else productContent" class="flex justify-center items-center">
        <mat-spinner diameter="50" class="spinner-center custom-spinner"></mat-spinner>
      </div>
      <ng-template #productContent>
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
      </ng-template>

      <!-- Productos relacionados -->
      <div *ngIf="relatedProducts.length > 0" class="related-products mt-8">
        <h3 class="text-xl font-bold mb-4">Productos relacionados</h3>
        <div class="grid grid-cols-2 gap-4">
          <app-product-card
            *ngFor="let relatedProduct of relatedProducts"
            [product]="relatedProduct"
          ></app-product-card>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .back-button {
        color: #f97316;
        background: none;
        border: none;
        cursor: pointer;
        font-size: 16px;
      }
      .spinner-center {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 9999;
      }
    `,
  ],
})
export class ProductDetailComponent implements OnInit {
  product: Product | undefined;
  relatedProducts: Product[] = [];
  loading = true;

  // Inyecta el servicio del carrito
  CartService = inject(CartService);

  constructor(
    private route: ActivatedRoute,
    private productsService: ProductsService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const productId = params.get('id');
      if (productId) {
        this.loadProductDetails(Number(productId));
      }
    });
  }

  loadProductDetails(productId: number): void {
    this.loading = true;
    this.productsService
      .getProductDetails(productId)
      .pipe(
        catchError((error) => {
          console.error('Error al cargar el producto:', error);
          this.loading = false;
          return of(undefined);
        })
      )
      .subscribe((product) => {
        this.product = product;
        this.loading = false;
        if (product && product.category) {
          this.loadRelatedProducts(product.category);
        }
      });
  }

  loadRelatedProducts(category: string): void {
    this.productsService
      .getProductsByCategory(category)
      .pipe(
        catchError((error) => {
          console.error('Error al cargar productos relacionados:', error);
          return of([]);
        })
      )
      .subscribe((products) => {
        this.relatedProducts = products.filter(p => p.id !== this.product?.id);
      });
  }

  // Método para añadir el producto al carrito
  addToCart() {
    if (this.product) {
      this.CartService.addToCart(this.product);
      Swal.fire({
        title: 'Producto añadido',
        text: `El producto "${this.product.title}" ha sido añadido a la cesta.`,
        icon: 'success',
        confirmButtonText: 'OK',
      });
    }
  }

  // Método para regresar a la página anterior
  goBack() {
    this.location.back();
  }
}