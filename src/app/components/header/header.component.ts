import { CartService } from './../../services/cart.service';
import { Component, computed, inject, signal } from '@angular/core';
import { PrimaryButtonComponent } from "../primary-button/primary-button.component";
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-header',
  imports: [PrimaryButtonComponent,RouterLink],
  template: `
     <div
      class="bg-slate-100 px-4 py-3 shadow-md flex justify-between items-center">
      <button class="text-2xl" routerLink="/">My Store</button>
      <app-primary-button label="{{ cartLabel() }}" routerLink="/cart" />
</div>
  `,
  styles: ``
})
export class HeaderComponent {

  CartService = inject(CartService)

  cartLabel = computed(() => `Cart (${this.CartService.cart().length})`);
}
