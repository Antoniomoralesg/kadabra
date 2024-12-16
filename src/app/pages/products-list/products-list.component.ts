import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Product } from '../../models/products.models';
import { ProductCardComponent } from './product-card/product-card.component';
import { ProductsService } from '../../services/products.service';
import { catchError, finalize } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-products-list',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    ProductCardComponent,
  ],
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
    <div
      class="categories-container my-4"
      (touchstart)="onTouchStart($event)"
      (touchmove)="onTouchMove($event)"
      (touchend)="onTouchEnd()"
    >
      <div class="categories flex space-x-2 justify-center">
        <button
          *ngFor="let category of displayCategories"
          (click)="filterByCategory(category)"
          class="px-4 py-2 rounded-lg text-sm font-semibold border category-button"
          [class.bg-orange-500]="selectedCategory === category"
          [class.text-white]="selectedCategory === category"
          [class.bg-white-200]="selectedCategory !== category"
        >
          <mat-icon>{{ categoryIconMap[category] || 'category' }}</mat-icon>
          {{ categoryMap[category] || category }}
        </button>
      </div>
    </div>

    <!-- Loader -->
    <mat-spinner
      *ngIf="loading()"
      diameter="50"
      class="spinner-center custom-spinner"
    ></mat-spinner>

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
    <div
      *ngIf="!loading() && totalPages() > 1"
      class="mt-6 flex justify-center mb-6"
    >
      <button
        *ngFor="let page of pages(); let i = index"
        class="px-4 py-2 mx-1 text-sm font-semibold bg-gray-300 rounded-lg"
        [class.bg-blue-500]="currentPage() === i + 1"
        (click)="goToPage(i + 1)"
      >
        {{ i + 1 }}
      </button>
    </div>
  `,
  styles: [
    `
      .categories-container {
        overflow-x: auto;
        white-space: nowrap;
        -webkit-overflow-scrolling: touch;
      }
      .categories {
        display: inline-flex;
        justify-content: center;
        width: 100%;
      }
      .category-button {
        margin: 0.5rem;
      }
      .flex-wrap {
        flex-wrap: wrap;
      }
      .space-x-2 > * {
        margin-right: 0.5rem;
      }
      .space-x-2 > *:last-child {
        margin-right: 0;
      }
      .space-y-2 > * {
        margin-bottom: 0.5rem;
      }
      .space-y-2 > *:last-child {
        margin-bottom: 0;
      }
      .spinner-center {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 9999;
      }
      @media (max-width: 640px) {
        .categories-container {
          overflow-x: auto;
          white-space: nowrap;
        }
        .categories {
          display: inline-flex;
          justify-content: flex-start;
        }
        .category-button {
          flex: 1 1 auto;
          margin: 0.25rem;
        }
      }
    `,
  ],
})
export class ProductsListComponent implements OnInit {
  products = signal<Product[]>([]);
  categories = signal<string[]>([]);
  displayCategories: string[] = [];
  selectedCategory = 'Todos';
  loading = signal<boolean>(true);
  currentPage = signal<number>(1);
  productsPerPage = signal<number>(6);
  totalPages = signal<number>(0);
  paginatedProducts = signal<Product[]>([]);

  // Mapeo de categorías a nombres personalizados
  categoryMap: { [key: string]: string } = {
    "men's clothing": 'Ropa de Hombre',
    "women's clothing": 'Ropa de Mujer',
    jewelery: 'Joyería',
    electronics: 'Electrónica',
  };

  // Mapeo de categorías a íconos
  categoryIconMap: { [key: string]: string } = {
    "men's clothing": 'male',
    "women's clothing": 'female',
    jewelery: 'diamond',
    electronics: 'devices',
  };

  startX = 0;
  currentX = 0;
  isDragging = false;

  constructor(private productsService: ProductsService) {}

  ngOnInit() {
    this.loading.set(true);
    this.productsService
      .getAllProducts()
      .pipe(
        catchError((error) => {
          console.error('Error al cargar los productos:', error);
          return of([]);
        }),
        finalize(() => this.loading.set(false))
      )
      .subscribe((productsData) => {
        this.products.set(productsData);
        this.updateTotalPages();
        this.updatePaginatedProducts();
      });

    this.productsService
      .getCategories()
      .pipe(
        catchError((error) => {
          console.error('Error al cargar las categorías:', error);
          return of([]);
        })
      )
      .subscribe((categoriesData) => {
        this.categories.set(categoriesData);
        this.displayCategories = ['Todos', ...this.categories()];
      });
  }

  updateTotalPages() {
    this.totalPages.set(
      Math.ceil(this.products().length / this.productsPerPage())
    );
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

  filterByCategory(category: string) {
    this.selectedCategory = category;
    this.loading.set(true);
    const products$ =
      category === 'Todos'
        ? this.productsService.getAllProducts()
        : this.productsService.getProductsByCategory(category);

    products$
      .pipe(
        catchError((error) => {
          console.error('Error al filtrar por categoría:', error);
          return of([]);
        }),
        finalize(() => this.loading.set(false))
      )
      .subscribe((filteredProducts) => {
        this.products.set(filteredProducts);
        this.currentPage.set(1);
        this.updateTotalPages();
        this.updatePaginatedProducts();
      });
  }

  filterByName(event: Event) {
    const query = (event.target as HTMLInputElement).value.toLowerCase();
    this.loading.set(true);
    this.productsService
      .getAllProducts()
      .pipe(
        catchError((error) => {
          console.error('Error al filtrar por nombre:', error);
          return of([]);
        }),
        finalize(() => this.loading.set(false))
      )
      .subscribe((allProducts) => {
        const filteredProducts = allProducts.filter((product) =>
          product.title.toLowerCase().includes(query)
        );
        this.products.set(filteredProducts);
        this.currentPage.set(1);
        this.updateTotalPages();
        this.updatePaginatedProducts();
      });
  }

  onTouchStart(event: TouchEvent) {
    this.startX = event.touches[0].clientX;
    this.isDragging = true;
  }

  onTouchMove(event: TouchEvent) {
    if (!this.isDragging) return;
    this.currentX = event.touches[0].clientX;
    const diffX = this.startX - this.currentX;
    const container = document.querySelector(
      '.categories-container'
    ) as HTMLElement;
    if (container) {
      container.scrollLeft += diffX;
      this.startX = this.currentX;
    }
  }

  onTouchEnd() {
    this.isDragging = false;
  }

  pages() {
    return Array.from({ length: this.totalPages() }, (_, i) => i + 1);
  }
}
