import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SavedAdvertisementComponent } from './saved-advertisement.component';

describe('SavedAdvertisementComponent', () => {
  let component: SavedAdvertisementComponent;
  let fixture: ComponentFixture<SavedAdvertisementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SavedAdvertisementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SavedAdvertisementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
