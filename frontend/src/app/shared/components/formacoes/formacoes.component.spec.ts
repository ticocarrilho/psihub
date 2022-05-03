import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormacoesComponent } from './formacoes.component';

describe('FormacoesComponent', () => {
  let component: FormacoesComponent;
  let fixture: ComponentFixture<FormacoesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormacoesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormacoesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
