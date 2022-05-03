import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultaListComponent } from './consulta-list.component';

describe('ConsultaListComponent', () => {
  let component: ConsultaListComponent;
  let fixture: ComponentFixture<ConsultaListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsultaListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultaListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
