import { Injectable, signal } from '@angular/core';
import { Product } from '../models/products.models';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  // Inicializa el carrito con datos de localStorage si existen
  cart = signal<Product[]>(JSON.parse(localStorage.getItem('cart') || '[]'));

  // Guarda el carrito en localStorage cuando se actualiza
  private saveCart() {
    localStorage.setItem('cart', JSON.stringify(this.cart()));
  }

  addToCart(product: Product) {
    const currentCart = this.cart();
    this.cart.set([...currentCart, product]); // Añadimos el producto
    this.saveCart(); // Guardamos el carrito actualizado en localStorage
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

  constructor() {}
}
