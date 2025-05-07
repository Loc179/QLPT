import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupportrequestCreateComponent } from './supportrequest-create.component';

describe('SupportrequestCreateComponent', () => {
  let component: SupportrequestCreateComponent;
  let fixture: ComponentFixture<SupportrequestCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SupportrequestCreateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SupportrequestCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
