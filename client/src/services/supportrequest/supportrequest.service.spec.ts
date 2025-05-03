import { TestBed } from '@angular/core/testing';

import { SupportrequestService } from './supportrequest.service';

describe('SupportrequestService', () => {
  let service: SupportrequestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SupportrequestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
