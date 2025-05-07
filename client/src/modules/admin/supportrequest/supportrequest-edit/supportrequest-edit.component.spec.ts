import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupportrequestEditComponent } from './supportrequest-edit.component';

describe('SupportrequestEditComponent', () => {
  let component: SupportrequestEditComponent;
  let fixture: ComponentFixture<SupportrequestEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SupportrequestEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SupportrequestEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
