import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VipCardComponent } from './vip-card.component';

describe('VipCardComponent', () => {
  let component: VipCardComponent;
  let fixture: ComponentFixture<VipCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VipCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VipCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
