import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupportrequestDetailComponent } from './supportrequest-detail.component';

describe('SupportrequestDetailComponent', () => {
  let component: SupportrequestDetailComponent;
  let fixture: ComponentFixture<SupportrequestDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SupportrequestDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SupportrequestDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
