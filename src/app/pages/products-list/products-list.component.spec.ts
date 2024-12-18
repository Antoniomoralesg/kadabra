import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductsListComponent } from './products-list.component';
import { ProductsService } from '../../services/products.service';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';
import { Product } from '../../models/products.models';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';
import { ProductCardComponent } from './product-card/product-card.component';
import { ActivatedRoute } from '@angular/router';

describe('ProductsListComponent', () => {
  let component: ProductsListComponent;
  let fixture: ComponentFixture<ProductsListComponent>;
  let productsService: jasmine.SpyObj<ProductsService>;

  const mockProducts: Product[] = [
    {
      id: 1,
      title: 'Test Product 1',
      price: 100,
      image: 'test-image-1.jpg',
      stock: 10,
      description: 'Test Description 1',
      rating: { rate: 4.5, count: 10 },
      category: 'TestCategory'
    },
    {
      id: 2,
      title: 'Test Product 2',
      price: 200,
      image: 'test-image-2.jpg',
      stock: 5,
      description: 'Test Description 2',
      rating: { rate: 4.0, count: 5 },
      category: 'TestCategory'
    }
  ];

  const mockCategories: string[] = ['TestCategory1', 'TestCategory2'];

  beforeEach(async () => {
    const productsServiceSpy = jasmine.createSpyObj('ProductsService', ['getAllProducts', 'getProductsByCategory', 'getCategories']);

    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        MatIconModule,
        MatProgressSpinnerModule,
        ProductCardComponent,
        ProductsListComponent
      ],
      providers: [
        { provide: ProductsService, useValue: productsServiceSpy },
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

    fixture = TestBed.createComponent(ProductsListComponent);
    component = fixture.componentInstance;
    productsService = TestBed.inject(ProductsService) as jasmine.SpyObj<ProductsService>;

    productsService.getAllProducts.and.returnValue(of(mockProducts));
    productsService.getCategories.and.returnValue(of(mockCategories));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load products on init', () => {
    expect(productsService.getAllProducts).toHaveBeenCalled();
    expect(component.products().length).toBe(2);
  });

  it('should load categories on init', () => {
    expect(productsService.getCategories).toHaveBeenCalled();
    expect(component.displayCategories.length).toBe(3); // 'Todos' + 2 mock categories
  });

  it('should filter products by category', () => {
    productsService.getProductsByCategory.and.returnValue(of([mockProducts[0]]));
    component.filterByCategory('TestCategory1');
    expect(productsService.getProductsByCategory).toHaveBeenCalledWith('TestCategory1');
    expect(component.products().length).toBe(1);
  });

  it('should filter products by name', () => {
    const inputElement = fixture.debugElement.query(By.css('input')).nativeElement;
    inputElement.value = 'Test Product 1';
    inputElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(component.products().length).toBe(1);
    expect(component.products()[0].title).toBe('Test Product 1');
  });

  it('should paginate products', () => {
    component.productsPerPage.set(1);
    component.updateTotalPages();
    component.updatePaginatedProducts();
    expect(component.totalPages()).toBe(2);
    expect(component.paginatedProducts().length).toBe(1);
  });

  it('should navigate to the correct page', () => {
    component.productsPerPage.set(1);
    component.updateTotalPages();
    component.goToPage(2);
    expect(component.currentPage()).toBe(2);
    expect(component.paginatedProducts()[0].title).toBe('Test Product 2');
  });

  it('should handle touch events for category scrolling', () => {
    const touchStartEvent = new TouchEvent('touchstart', { touches: [new Touch({ identifier: 0, target: document.createElement('div'), clientX: 100 })] });
    const touchMoveEvent = new TouchEvent('touchmove', { touches: [new Touch({ identifier: 0, target: document.createElement('div'), clientX: 50 })] });
    const touchEndEvent = new TouchEvent('touchend');

    component.onTouchStart(touchStartEvent);
    expect(component.isDragging).toBeTrue();

    component.onTouchMove(touchMoveEvent);
    expect(component.startX).toBe(50);

    component.onTouchEnd();
    expect(component.isDragging).toBeFalse();
  });
});