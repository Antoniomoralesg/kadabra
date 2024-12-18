import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductDetailComponent } from './product-detail.component';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ProductsService } from '../../services/products.service';
import { CartService } from '../../services/cart.service';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';
import Swal from 'sweetalert2';
import { Product } from '../../models/products.models';

describe('ProductDetailComponent', () => {
  let component: ProductDetailComponent;
  let fixture: ComponentFixture<ProductDetailComponent>;
  let productsService: jasmine.SpyObj<ProductsService>;
  let cartService: jasmine.SpyObj<CartService>;
  let location: jasmine.SpyObj<Location>;

  const mockProduct: Product = {
    id: 1,
    title: 'Test Product',
    price: 100,
    image: 'test-image.jpg',
    stock: 10,
    description: 'Test Description',
    rating: { rate: 4.5, count: 10 },
    category: 'TestCategory'
  };

  const mockRelatedProducts: Product[] = [
    {
      id: 2,
      title: 'Related Product 1',
      price: 50,
      image: 'related-image-1.jpg',
      stock: 5,
      description: 'Related Description 1',
      rating: { rate: 4.0, count: 5 },
      category: 'TestCategory'
    },
    {
      id: 3,
      title: 'Related Product 2',
      price: 75,
      image: 'related-image-2.jpg',
      stock: 8,
      description: 'Related Description 2',
      rating: { rate: 4.2, count: 8 },
      category: 'TestCategory'
    }
  ];

  beforeEach(async () => {
    const productsServiceSpy = jasmine.createSpyObj('ProductsService', ['getProductDetails', 'getProductsByCategory']);
    const cartServiceSpy = jasmine.createSpyObj('CartService', ['addToCart']);
    const locationSpy = jasmine.createSpyObj('Location', ['back']);

    await TestBed.configureTestingModule({
      imports: [ProductDetailComponent],
      providers: [
        { provide: ProductsService, useValue: productsServiceSpy },
        { provide: CartService, useValue: cartServiceSpy },
        { provide: Location, useValue: locationSpy },
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: of({
              get: (key: string) => '1'
            })
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductDetailComponent);
    component = fixture.componentInstance;
    productsService = TestBed.inject(ProductsService) as jasmine.SpyObj<ProductsService>;
    cartService = TestBed.inject(CartService) as jasmine.SpyObj<CartService>;
    location = TestBed.inject(Location) as jasmine.SpyObj<Location>;

    productsService.getProductDetails.and.returnValue(of(mockProduct));
    productsService.getProductsByCategory.and.returnValue(of(mockRelatedProducts));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load product details on init', () => {
    expect(productsService.getProductDetails).toHaveBeenCalledWith(1);
    expect(component.product).toEqual(mockProduct);
    expect(component.loading).toBeFalse();
  });

  it('should load related products', () => {
    expect(productsService.getProductsByCategory).toHaveBeenCalledWith('TestCategory');
    expect(component.relatedProducts.length).toBe(2);
  });

  it('should add product to cart', () => {
    spyOn(Swal, 'fire');
    component.addToCart();
    expect(cartService.addToCart).toHaveBeenCalledWith(mockProduct);
    expect(Swal.fire).toHaveBeenCalledWith(jasmine.objectContaining({
      title: 'Producto añadido',
      text: `El producto "${mockProduct.title}" ha sido añadido a la cesta.`,
      icon: 'success',
      confirmButtonText: 'OK',
    }));
  });

  it('should navigate back when goBack is called', () => {
    component.goBack();
    expect(location.back).toHaveBeenCalled();
  });

  it('should display product details', () => {
    const titleElement = fixture.debugElement.query(By.css('h2')).nativeElement;
    expect(titleElement.textContent).toContain('Test Product');
  });

  it('should display related products', () => {
    const relatedProductElements = fixture.debugElement.queryAll(By.css('app-product-card'));
    expect(relatedProductElements.length).toBe(2);
  });
});