import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomservicesListComponent } from './roomservices-list.component';

describe('RoomservicesListComponent', () => {
  let component: RoomservicesListComponent;
  let fixture: ComponentFixture<RoomservicesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoomservicesListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoomservicesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
