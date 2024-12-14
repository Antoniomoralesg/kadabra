import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ProductsListComponent } from '../pages/products-list/products-list.component';

const routes: Routes = [
  { path: '', component: ProductsListComponent }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ProductsListComponent
  ]
})
export class ProductsModule { }