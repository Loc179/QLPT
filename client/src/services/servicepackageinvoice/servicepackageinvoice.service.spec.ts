import { TestBed } from '@angular/core/testing';

import { ServicepackageinvoiceService } from './servicepackageinvoice.service';

describe('ServicepackageinvoiceService', () => {
  let service: ServicepackageinvoiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServicepackageinvoiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
