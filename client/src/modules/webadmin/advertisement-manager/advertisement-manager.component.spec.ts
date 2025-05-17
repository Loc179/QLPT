import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvertisementManagerComponent } from './advertisement-manager.component';

describe('AdvertisementManagerComponent', () => {
  let component: AdvertisementManagerComponent;
  let fixture: ComponentFixture<AdvertisementManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdvertisementManagerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdvertisementManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
