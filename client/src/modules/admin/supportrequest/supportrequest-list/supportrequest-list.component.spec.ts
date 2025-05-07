import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupportrequestListComponent } from './supportrequest-list.component';

describe('SupportrequestListComponent', () => {
  let component: SupportrequestListComponent;
  let fixture: ComponentFixture<SupportrequestListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SupportrequestListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SupportrequestListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
