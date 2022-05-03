import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PsicologosComponent } from './psicologos.component';

describe('PsicologosComponent', () => {
  let component: PsicologosComponent;
  let fixture: ComponentFixture<PsicologosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PsicologosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PsicologosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
