import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../services/products.service';
import { Product } from '../../models/products.models';
import { CartService } from '../../services/cart.service';
import { PrimaryButtonComponent } from '../../components/primary-button/primary-button.component';

@Component({
  selector: 'app-product-detail',
  imports: [PrimaryButtonComponent],
  template: `
    <div
      class="bg-white shadow-md border rounded-xl p-6 flex flex-col gap-6 max-w-xl mx-auto mt-8 mb-8"
    >
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
            class="mt-6 flex justify-center mb-6"
            (btnClicked)="addToCart()"
          />
        </div>
      </div>
    </div>
  `,
  styles: [],
})
export class ProductDetailComponent implements OnInit {
  product: Product | undefined;

  // Inyecta el servicio del carrito
  CartService = inject(CartService);

  constructor(
    private route: ActivatedRoute,
    private productsService: ProductsService
  ) {}

  ngOnInit(): void {
    const productId = this.route.snapshot.paramMap.get('id');
    if (productId) {
      this.productsService
        .getProductDetails(Number(productId))
        .then((product) => {
          this.product = product;
        });
    }
  }

  // Método para añadir el producto al carrito
  addToCart() {
    if (this.product) {
      this.CartService.addToCart(this.product);
    }
  }
}
