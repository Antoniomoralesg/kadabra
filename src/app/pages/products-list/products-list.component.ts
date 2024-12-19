import { Component, OnInit, OnDestroy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Product } from '../../models/products.models';
import { ProductCardComponent } from './product-card/product-card.component';
import { ProductsService } from '../../services/products.service';
import { catchError, finalize } from 'rxjs/operators';
import { of, Subscription, Subject } from 'rxjs';
import { debounceTime, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-products-list',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    ProductCardComponent,
  ],
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css'],
})
export class ProductsListComponent implements OnInit, OnDestroy {
  products = signal<Product[]>([]);
  categories = signal<string[]>([]);
  displayCategories: string[] = [];
  selectedCategory = 'Todos';
  loading = signal<boolean>(true);
  currentPage = signal<number>(1);
  productsPerPage = signal<number>(4);
  totalPages = signal<number>(0);
  paginatedProducts = signal<Product[]>([]);
  private subscriptions: Subscription = new Subscription();
  private categoryClick$ = new Subject<string>();

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
    const productsSubscription = this.productsService
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

    const categoriesSubscription = this.productsService
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

    this.subscriptions.add(productsSubscription);
    this.subscriptions.add(categoriesSubscription);

    // Debounce para evitar múltiples solicitudes rápidas
    const categoryClickSubscription = this.categoryClick$
      .pipe(
        debounceTime(300),
        switchMap((category) => {
          this.selectedCategory = category;
          this.loading.set(true);
          const products$ =
            category === 'Todos'
              ? this.productsService.getAllProducts()
              : this.productsService.getProductsByCategory(category);

          return products$.pipe(
            catchError((error) => {
              console.error('Error al filtrar por categoría:', error);
              return of([]);
            }),
            finalize(() => this.loading.set(false))
          );
        })
      )
      .subscribe((filteredProducts) => {
        this.products.set(filteredProducts);
        this.currentPage.set(1);
        this.updateTotalPages();
        this.updatePaginatedProducts();
      });

    this.subscriptions.add(categoryClickSubscription);
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
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
    this.categoryClick$.next(category);
  }

  filterByName(event: Event) {
    const query = (event.target as HTMLInputElement).value.toLowerCase();
    this.loading.set(true);
    const nameFilterSubscription = this.productsService
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

    this.subscriptions.add(nameFilterSubscription);
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