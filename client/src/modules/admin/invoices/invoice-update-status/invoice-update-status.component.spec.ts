import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceUpdateStatusComponent } from './invoice-update-status.component';

describe('InvoiceUpdateStatusComponent', () => {
  let component: InvoiceUpdateStatusComponent;
  let fixture: ComponentFixture<InvoiceUpdateStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InvoiceUpdateStatusComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InvoiceUpdateStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
