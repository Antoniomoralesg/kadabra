import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, retry, tap } from 'rxjs/operators';
import { Product } from '../models/products.models';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private baseUrl = 'https://fakestoreapi.com/products';
  private cacheDuration = 300000; // 5 minutes

  // Cache para productos y detalles de productos
  private productsCache: {
    [key: string]: { expiry: number; data: Product[] };
  } = {};
  private productDetailsCache: {
    [key: string]: { expiry: number; data: Product };
  } = {};
  private categoriesCache: { expiry: number; data: string[] } | null = null;

  constructor(private http: HttpClient) {}

  // Obtener todos los productos
  getAllProducts(): Observable<Product[]> {
    return this.getCachedData<Product[]>('allProducts', this.baseUrl);
  }

  // Obtener productos por categoría
  getProductsByCategory(category: string): Observable<Product[]> {
    const cacheKey = `category_${category}`;
    const url = `${this.baseUrl}/category/${category}`;
    return this.getCachedData<Product[]>(cacheKey, url);
  }

  // Obtener detalles de un producto específico
  getProductDetails(productId: number): Observable<Product> {
    const cacheKey = `product_${productId}`;
    const url = `${this.baseUrl}/${productId}`;
    return this.getCachedData<Product>(cacheKey, url);
  }

  // Obtener todas las categorías
  getCategories(): Observable<string[]> {
    if (this.categoriesCache && this.categoriesCache.expiry > Date.now()) {
      return of(this.categoriesCache.data);
    }

    return this.http.get<string[]>(`${this.baseUrl}/categories`).pipe(
      retry(3), 
      tap((data) => {
        this.categoriesCache = {
          expiry: Date.now() + this.cacheDuration,
          data: data,
        };
      }),
      catchError(this.handleError)
    );
  }

  // Método genérico para obtener datos en caché o desde la API
  private getCachedData<T extends Product | Product[]>(cacheKey: string, url: string): Observable<T> {
    // Verificar si los datos están en caché y no han expirado
    const cachedData = this.productsCache[cacheKey] || this.productDetailsCache[cacheKey];

    if (cachedData && cachedData.expiry > Date.now()) {
      return of(cachedData.data as T);
    }

    // Obtener datos desde la API y almacenarlos en caché
    return this.http.get<T>(url).pipe(
      retry(3), 
      tap((data) => {
        const cache = {
          expiry: Date.now() + this.cacheDuration,
          data: data,
        };
        if (Array.isArray(data)) {
          this.productsCache[cacheKey] = cache as { expiry: number; data: Product[] };
        } else {
          this.productDetailsCache[cacheKey] = cache as { expiry: number; data: Product };
        }
      }),
      catchError(this.handleError)
    );
  }

  // Manejo de errores para solicitudes HTTP
  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      // Error del lado del cliente
      errorMessage = `Client-side error: ${error.error.message}`;
    } else {
      // Error del lado del servidor
      errorMessage = `Server-side error: ${error.status}\nMessage: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}