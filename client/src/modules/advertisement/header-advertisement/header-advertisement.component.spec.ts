import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderAdvertisementComponent } from './header-advertisement.component';

describe('HeaderAdvertisementComponent', () => {
  let component: HeaderAdvertisementComponent;
  let fixture: ComponentFixture<HeaderAdvertisementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderAdvertisementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderAdvertisementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
