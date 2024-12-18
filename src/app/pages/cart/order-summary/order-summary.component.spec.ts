import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OrderSummaryComponent } from './order-summary.component';
import { CartService } from '../../../services/cart.service';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';

describe('OrderSummaryComponent', () => {
  let component: OrderSummaryComponent;
  let fixture: ComponentFixture<OrderSummaryComponent>;
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
      imports: [RouterTestingModule, OrderSummaryComponent], // Importar OrderSummaryComponent
      providers: [{ provide: CartService, useValue: cartServiceMock }]
    }).compileComponents();

    fixture = TestBed.createComponent(OrderSummaryComponent);
    component = fixture.componentInstance;
    cartService = TestBed.inject(CartService);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the correct total', () => {
    const totalElement = fixture.debugElement.nativeElement.querySelector('.text-lg.font-bold');
    expect(totalElement.textContent).toContain('€ 300');
  });

  it('should navigate to payment when proceedToPayment is called', () => {
    spyOn(router, 'navigate');
    component.proceedToPayment();
    expect(router.navigate).toHaveBeenCalledWith(['/payment']);
  });
});