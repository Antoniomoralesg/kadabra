import { Injectable, signal } from '@angular/core';
import { Product } from '../models/products.models';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  // Inicializa el carrito con datos de localStorage si existen
  cart = signal<Product[]>(JSON.parse(localStorage.getItem('cart') || '[]'));
  private currentId = this.cart().length > 0 ? Math.max(...this.cart().map(p => p.id)) + 1 : 1;

  // Guarda el carrito en localStorage cuando se actualiza
  private saveCart() {
    localStorage.setItem('cart', JSON.stringify(this.cart()));
  }

  addToCart(product: Product) {
    const newProduct = { ...product, id: this.currentId++ }; // Usamos un contador para generar un ID único
    const currentCart = this.cart();
    this.cart.set([...currentCart, newProduct]);
    this.saveCart();
  }

  removeFromCart(product: Product) {
    const currentCart = this.cart();
    this.cart.set(currentCart.filter((p) => p.id !== product.id)); // Filtramos el carrito para remover el producto
    this.saveCart(); // Guardamos el carrito actualizado en localStorage
  }

  clearCart() {
    this.cart.set([]); // Vaciamos el carrito
    this.saveCart(); // Guardamos el carrito vacío en localStorage
  }

  getCart(): Product[] {
    return this.cart();
  }

  constructor() {}
}