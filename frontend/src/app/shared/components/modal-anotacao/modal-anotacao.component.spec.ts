import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAnotacaoComponent } from './modal-anotacao.component';

describe('ModalAnotacaoComponent', () => {
  let component: ModalAnotacaoComponent;
  let fixture: ComponentFixture<ModalAnotacaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalAnotacaoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalAnotacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
