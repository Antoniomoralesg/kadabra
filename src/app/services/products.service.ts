import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private baseUrl = 'https://fakestoreapi.com/products';

  async getAllProducts() {
    const response = await fetch(this.baseUrl);
    return response.json();
  }

  async getProductsByCategory(category: string) {
    const response = await fetch(`${this.baseUrl}/category/${category}`);
    return response.json();
  }

  async getProductDetails(productId: number) {
    const response = await fetch(`${this.baseUrl}/${productId}`);
    return response.json();
  }

  async getCategories() {
    const response = await fetch(`${this.baseUrl}/categories`);
    return response.json();
  }
  
}
