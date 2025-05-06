import { TestBed } from '@angular/core/testing';

import { ServicepackageService } from './servicepackage.service';

describe('ServicepackageService', () => {
  let service: ServicepackageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServicepackageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
