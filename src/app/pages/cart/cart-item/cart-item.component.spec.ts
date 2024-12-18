import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CartItemComponent } from './cart-item.component';
import { CartService } from '../../../services/cart.service';
import { Product } from '../../../models/products.models';
import { By } from '@angular/platform-browser';
import Swal from 'sweetalert2';

describe('CartItemComponent', () => {
  let component: CartItemComponent;
  let fixture: ComponentFixture<CartItemComponent>;
  let cartService: CartService;

  const mockProduct: Product = {
    id: 1,
    title: 'Test Product',
    price: 100,
    description: 'Test Description',
    category: 'Test Category',
    image: 'test-image.jpg',
    rating: {
      rate: 4.5,
      count: 10,
    },
    stock: 20,
    uniqueId: 'unique-id-123',
    quantity: 1,
  };

  beforeEach(async () => {
    const cartServiceMock = {
      removeFromCart: jasmine.createSpy('removeFromCart'),
    };

    await TestBed.configureTestingModule({
      imports: [CartItemComponent],
      providers: [{ provide: CartService, useValue: cartServiceMock }],
    }).compileComponents();

    fixture = TestBed.createComponent(CartItemComponent);
    component = fixture.componentInstance;
    cartService = TestBed.inject(CartService);
    component.item = mockProduct;
    fixture.detectChanges();

    // Espiar y simular Swal.fire
    spyOn(Swal, 'fire').and.returnValue(
      Promise.resolve({
        isConfirmed: true,
        isDenied: false,
        isDismissed: false,
        value: null,
      })
    );
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display product title', () => {
    const titleElement = fixture.debugElement.query(
      By.css('.text-md')
    ).nativeElement;
    expect(titleElement.textContent).toContain('Test Product');
  });

  it('should display product price', () => {
    const priceElement = fixture.debugElement.query(
      By.css('.text-sm')
    ).nativeElement;
    expect(priceElement.textContent).toContain('$100');
  });

  it('should call removeFromCart when confirmRemove is called', async () => {
    await component.confirmRemove();
    expect(cartService.removeFromCart).toHaveBeenCalledWith(mockProduct);
  });
});
