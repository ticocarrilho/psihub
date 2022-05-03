import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardPsicologoComponent } from './dashboard-psicologo.component';

describe('DashboardPsicologoComponent', () => {
  let component: DashboardPsicologoComponent;
  let fixture: ComponentFixture<DashboardPsicologoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardPsicologoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardPsicologoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
