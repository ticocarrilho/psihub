import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnotacoesListComponent } from './anotacoes-list.component';

describe('AnotacoesListComponent', () => {
  let component: AnotacoesListComponent;
  let fixture: ComponentFixture<AnotacoesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnotacoesListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnotacoesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
