import { TestBed } from '@angular/core/testing';

import { PacienteDetailsGuard } from './paciente-details.guard';

describe('PacienteDetailsGuard', () => {
  let guard: PacienteDetailsGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(PacienteDetailsGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
