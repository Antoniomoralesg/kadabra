import { Component, OnInit, signal } from '@angular/core';
import { Product } from '../../models/products.models';
import { ProductCardComponent } from './product-card/product-card.component';
import { ProductsService } from '../../services/products.service';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { StoreBenefitsComponent } from '../../components/store-benefits/store-benefits.component';
@Component({
  selector: 'app-products-list',
  standalone: true,
  imports: [ProductCardComponent, CommonModule, MatIconModule,StoreBenefitsComponent],
  template: `
    <div class="p-4 space-y-4 flex justify-center">
      <div class="relative w-full max-w-md">
        <input
          type="text"
          placeholder="Busque aquí"
          class="p-2 pl-10 border rounded w-full"
          (input)="filterByName($event)"
        />
        <mat-icon class="absolute left-2 top-2 text-gray-500">search</mat-icon>
      </div>
    </div>

    <!-- Botones de categorías -->
    <div class="flex justify-center space-x-4 my-4">
      <button
        *ngFor="let category of displayCategories"
        (click)="filterByCategory(category)"
        class="px-4 py-2 rounded-lg text-sm font-semibold border"
        [class.bg-orange-500]="selectedCategory === category"
        [class.text-white]="selectedCategory === category"
        [class.bg-white-200]="selectedCategory !== category"
      >
        {{ category }}
      </button>
    </div>

    <!-- Loader -->
    <div *ngIf="loading()" class="text-center py-4">
      <div class="spinner-border" role="status">
        <span class="visually-hidden">Cargando...</span>
      </div>
    </div>

    <!-- Listado de productos -->
    <div *ngIf="!loading()" class="p-8 grid grid-cols-2 gap-4">
      <app-product-card
        *ngFor="let product of paginatedProducts()"
        [product]="product"
      ></app-product-card>
    </div>

    <div
      *ngIf="!loading() && paginatedProducts().length === 0"
      class="text-center py-4"
    >
      <p>No se encontraron productos</p>
    </div>

    <!-- Paginación -->
    <div *ngIf="!loading()" class="mt-6 flex justify-center mb-6">
      <button
        *ngFor="let page of pages(); let i = index"
        class="px-4 py-2 mx-1 text-sm font-semibold bg-gray-300 rounded-lg"
        [class.bg-blue-500]="currentPage() === i + 1"
        (click)="goToPage(i + 1)"
      >
        {{ i + 1 }}
      </button>
    </div>

     <!-- Store Benefits -->
     <app-store-benefits></app-store-benefits>
  `,
  styles: [
    `
      .spinner-border {
        width: 3rem;
        height: 3rem;
        border: 0.4em solid rgba(0, 0, 0, 0.1);
        border-top: 0.4em solid #007bff;
        border-radius: 50%;
        animation: spinner 0.75s linear infinite;
      }

      @keyframes spinner {
        to {
          transform: rotate(360deg);
        }
      }
    `,
  ],
})
export class ProductsListComponent implements OnInit {
  products = signal<Product[]>([]);
  categories = signal<string[]>([]);
  displayCategories: string[] = []; // Lista para mostrar las categorías
  selectedCategory = 'Todos'; // Categoría seleccionada
  loading = signal<boolean>(true);
  currentPage = signal<number>(1);
  productsPerPage = signal<number>(6);
  totalPages = signal<number>(0);
  paginatedProducts = signal<Product[]>([]);

  constructor(private productsService: ProductsService) {}

  async ngOnInit() {
    try {
      this.loading.set(true);
      const [productsData, categoriesData] = await Promise.all([
        this.productsService.getAllProducts(),
        this.productsService.getCategories(),
      ]);
      this.products.set(productsData);
      this.categories.set(categoriesData);

      // Preparamos las categorías para el uso en la plantilla
      this.displayCategories = ['Todos', ...this.categories()];

      this.totalPages.set(
        Math.ceil(this.products().length / this.productsPerPage())
      );
      this.updatePaginatedProducts();
    } catch (error) {
      console.error('Error al cargar los datos:', error);
    } finally {
      this.loading.set(false);
    }
  }

  updatePaginatedProducts() {
    const startIndex = (this.currentPage() - 1) * this.productsPerPage();
    const endIndex = startIndex + this.productsPerPage();
    this.paginatedProducts.set(this.products().slice(startIndex, endIndex));
  }

  goToPage(page: number) {
    this.currentPage.set(page);
    this.updatePaginatedProducts();
  }

  async filterByCategory(category: string) {
    this.selectedCategory = category;
    this.loading.set(true);
    try {
      if (category === 'Todos') {
        const allProducts = await this.productsService.getAllProducts();
        this.products.set(allProducts);
      } else {
        const filteredProducts =
          await this.productsService.getProductsByCategory(category);
        this.products.set(filteredProducts);
      }
      this.totalPages.set(
        Math.ceil(this.products().length / this.productsPerPage())
      );
      this.updatePaginatedProducts();
    } catch (error) {
      console.error('Error al filtrar por categoría:', error);
    } finally {
      this.loading.set(false);
    }
  }

  async filterByName(event: Event) {
    const query = (event.target as HTMLInputElement).value;
    this.loading.set(true);
    try {
      const allProducts: Product[] =
        await this.productsService.getAllProducts();
      const filteredProducts = allProducts.filter((product) =>
        product.title.toLowerCase().includes(query.toLowerCase())
      );
      this.products.set(filteredProducts);
      this.totalPages.set(
        Math.ceil(this.products().length / this.productsPerPage())
      );
      this.updatePaginatedProducts();
    } catch (error) {
      console.error('Error al filtrar por nombre:', error);
      this.products.set([]);
    } finally {
      this.loading.set(false);
    }
  }

  pages() {
    return Array.from({ length: this.totalPages() }, (_, i) => i + 1);
  }
}
