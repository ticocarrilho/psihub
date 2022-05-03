import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalFeedbackComponent } from './modal-feedback.component';

describe('ModalFeedbackComponent', () => {
  let component: ModalFeedbackComponent;
  let fixture: ComponentFixture<ModalFeedbackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalFeedbackComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalFeedbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
