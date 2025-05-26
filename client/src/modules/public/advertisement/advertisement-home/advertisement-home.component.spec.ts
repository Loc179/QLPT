import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvertisementHomeComponent } from './advertisement-home.component';

describe('AdvertisementHomeComponent', () => {
  let component: AdvertisementHomeComponent;
  let fixture: ComponentFixture<AdvertisementHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdvertisementHomeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdvertisementHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
