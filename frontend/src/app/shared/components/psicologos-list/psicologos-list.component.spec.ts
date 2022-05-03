import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PsicologosListComponent } from './psicologos-list.component';

describe('PsicologosListComponent', () => {
  let component: PsicologosListComponent;
  let fixture: ComponentFixture<PsicologosListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PsicologosListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PsicologosListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
