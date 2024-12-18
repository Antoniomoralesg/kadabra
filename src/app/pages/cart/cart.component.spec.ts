import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CartComponent } from './cart.component';
import { CartService } from '../../services/cart.service';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';

describe('CartComponent', () => {
  let component: CartComponent;
  let fixture: ComponentFixture<CartComponent>;
  let cartService: CartService;
  let router: Router;

  const mockCartItems = [
    {
      id: 1,
      title: 'Test Product 1',
      price: 100,
      image: 'test-image-1.jpg',
      stock: 20,
      quantity: 1
    },
    {
      id: 2,
      title: 'Test Product 2',
      price: 200,
      image: 'test-image-2.jpg',
      stock: 15,
      quantity: 2
    }
  ];

  beforeEach(async () => {
    const cartServiceMock = {
      getCart: jasmine.createSpy('getCart').and.returnValue(mockCartItems) // Devolver un array
    };

    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, CartComponent], // Importar CartComponent
      providers: [{ provide: CartService, useValue: cartServiceMock }]
    }).compileComponents();

    fixture = TestBed.createComponent(CartComponent);
    component = fixture.componentInstance;
    cartService = TestBed.inject(CartService);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display cart items', () => {
    const cartItems = fixture.debugElement.queryAll(By.css('app-cart-item'));
    expect(cartItems.length).toBe(2);
  });

  it('should navigate to home when goHome is called', () => {
    spyOn(router, 'navigate');
    component.goHome();
    expect(router.navigate).toHaveBeenCalledWith(['/']);
  });
});