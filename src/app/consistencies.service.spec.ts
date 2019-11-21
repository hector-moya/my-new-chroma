import { TestBed } from '@angular/core/testing';

import { ConsistenciesService } from './consistencies.service';

describe('ConsistenciesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ConsistenciesService = TestBed.get(ConsistenciesService);
    expect(service).toBeTruthy();
  });
});
