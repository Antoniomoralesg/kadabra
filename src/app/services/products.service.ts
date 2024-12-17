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
  private productsCache: { [key: string]: { expiry: number, data: Product[] } } = {};
  private productDetailsCache: { [key: string]: { expiry: number, data: Product } } = {};
  private categoriesCache: { expiry: number, data: string[] } | null = null;

  constructor(private http: HttpClient) {}

  getAllProducts(): Observable<Product[]> {
    const cacheKey = 'allProducts';
    const cachedData = this.productsCache[cacheKey];

    if (cachedData && cachedData.expiry > Date.now()) {
      return of(cachedData.data);
    }

    const request = this.http.get<Product[]>(this.baseUrl).pipe(
      retry(3), // Reintentar hasta 3 veces en caso de error
      tap((data) => {
        this.productsCache[cacheKey] = {
          expiry: Date.now() + this.cacheDuration,
          data: data
        };
      }),
      catchError(this.handleError)
    );

    return request;
  }

  getProductsByCategory(category: string): Observable<Product[]> {
    const cacheKey = `category_${category}`;
    const cachedData = this.productsCache[cacheKey];

    if (cachedData && cachedData.expiry > Date.now()) {
      return of(cachedData.data);
    }

    const request = this.http.get<Product[]>(`${this.baseUrl}/category/${category}`).pipe(
      retry(3), // Reintentar hasta 3 veces en caso de error
      tap((data) => {
        this.productsCache[cacheKey] = {
          expiry: Date.now() + this.cacheDuration,
          data: data
        };
      }),
      catchError(this.handleError)
    );

    return request;
  }

  getProductDetails(productId: number): Observable<Product> {
    const cacheKey = `product_${productId}`;
    const cachedData = this.productDetailsCache[cacheKey];

    if (cachedData && cachedData.expiry > Date.now()) {
      return of(cachedData.data);
    }

    const request = this.http.get<Product>(`${this.baseUrl}/${productId}`).pipe(
      retry(3), // Reintentar hasta 3 veces en caso de error
      tap((data) => {
        this.productDetailsCache[cacheKey] = {
          expiry: Date.now() + this.cacheDuration,
          data: data
        };
      }),
      catchError(this.handleError)
    );

    return request;
  }

  getCategories(): Observable<string[]> {
    if (this.categoriesCache && this.categoriesCache.expiry > Date.now()) {
      return of(this.categoriesCache.data);
    }

    const request = this.http.get<string[]>(`${this.baseUrl}/categories`).pipe(
      retry(3), // Reintentar hasta 3 veces en caso de error
      tap((data) => {
        this.categoriesCache = {
          expiry: Date.now() + this.cacheDuration,
          data: data
        };
      }),
      catchError(this.handleError)
    );

    return request;
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}