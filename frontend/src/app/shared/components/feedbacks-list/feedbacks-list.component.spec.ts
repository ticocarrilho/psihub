import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedbacksListComponent } from './feedbacks-list.component';

describe('FeedbacksListComponent', () => {
  let component: FeedbacksListComponent;
  let fixture: ComponentFixture<FeedbacksListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeedbacksListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedbacksListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
