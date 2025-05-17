import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicepackageComponent } from './servicepackage.component';

describe('ServicepackageComponent', () => {
  let component: ServicepackageComponent;
  let fixture: ComponentFixture<ServicepackageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServicepackageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServicepackageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
