import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CartComponent } from './cart.component';

@NgModule({
  imports: [
    RouterModule.forChild([{ path: '', component: CartComponent }]),
    CartComponent // Importamos el componente independiente
  ]
})
export class CartModule { }