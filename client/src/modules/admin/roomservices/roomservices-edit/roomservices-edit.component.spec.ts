import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomservicesEditComponent } from './roomservices-edit.component';

describe('RoomservicesEditComponent', () => {
  let component: RoomservicesEditComponent;
  let fixture: ComponentFixture<RoomservicesEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoomservicesEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoomservicesEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
