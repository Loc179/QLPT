import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupportrequestreplyComponent } from './supportrequestreply.component';

describe('SupportrequestreplyComponent', () => {
  let component: SupportrequestreplyComponent;
  let fixture: ComponentFixture<SupportrequestreplyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SupportrequestreplyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SupportrequestreplyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
