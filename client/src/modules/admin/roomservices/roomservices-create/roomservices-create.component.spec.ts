import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomservicesCreateComponent } from './roomservices-create.component';

describe('RoomservicesCreateComponent', () => {
  let component: RoomservicesCreateComponent;
  let fixture: ComponentFixture<RoomservicesCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoomservicesCreateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoomservicesCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
