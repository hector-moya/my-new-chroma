import { TestBed } from '@angular/core/testing';

import { ProductPriceService } from './product-price.service';

describe('ProductPriceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProductPriceService = TestBed.get(ProductPriceService);
    expect(service).toBeTruthy();
  });
});
