import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicepackageinvoiceComponent } from './servicepackageinvoice.component';

describe('ServicepackageinvoiceComponent', () => {
  let component: ServicepackageinvoiceComponent;
  let fixture: ComponentFixture<ServicepackageinvoiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServicepackageinvoiceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServicepackageinvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
