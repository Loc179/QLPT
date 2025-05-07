import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomservicesDetailComponent } from './roomservices-detail.component';

describe('RoomservicesDetailComponent', () => {
  let component: RoomservicesDetailComponent;
  let fixture: ComponentFixture<RoomservicesDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoomservicesDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoomservicesDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
