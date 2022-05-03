import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalContratoComponent } from './modal-contrato.component';

describe('ModalContratoComponent', () => {
  let component: ModalContratoComponent;
  let fixture: ComponentFixture<ModalContratoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalContratoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalContratoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
