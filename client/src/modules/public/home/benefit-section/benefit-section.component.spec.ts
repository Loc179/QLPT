import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BenefitSectionComponent } from './benefit-section.component';

describe('BenefitSectionComponent', () => {
  let component: BenefitSectionComponent;
  let fixture: ComponentFixture<BenefitSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BenefitSectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BenefitSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
