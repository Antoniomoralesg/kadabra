import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductCardComponent } from './product-card.component';
import { CartService } from '../../../services/cart.service';
import { Product } from '../../../models/products.models';
import { RouterTestingModule } from '@angular/router/testing';
import { PrimaryButtonComponent } from '../../../components/primary-button/primary-button.component';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

describe('ProductCardComponent', () => {
  let component: ProductCardComponent;
  let fixture: ComponentFixture<ProductCardComponent>;
  let cartService: jasmine.SpyObj<CartService>;

  beforeEach(async () => {
    const cartServiceSpy = jasmine.createSpyObj('CartService', ['addToCart']);

    await TestBed.configureTestingModule({
      imports: [CommonModule, RouterTestingModule, PrimaryButtonComponent, ProductCardComponent],
      providers: [
        { provide: CartService, useValue: cartServiceSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductCardComponent);
    component = fixture.componentInstance;
    cartService = TestBed.inject(CartService) as jasmine.SpyObj<CartService>;

    component.product = {
      id: 1,
      title: 'Test Product',
      price: 100,
      image: 'test.jpg',
      stock: 10,
      description: 'Test Description',
      rating: { rate: 4.5, count: 10 },
      category: 'TestCategory'
    };

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should add product to cart', () => {
    spyOn(Swal, 'fire');
    component.addToCart();
    expect(cartService.addToCart).toHaveBeenCalledWith(component.product);
    expect(Swal.fire).toHaveBeenCalledWith(jasmine.objectContaining({
      title: 'Producto añadido',
      text: `El producto "${component.product.title}" ha sido añadido a la cesta.`,
      icon: 'success',
      confirmButtonText: 'OK',
    }));
  });
});