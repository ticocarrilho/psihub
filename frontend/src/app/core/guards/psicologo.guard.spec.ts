import { TestBed } from '@angular/core/testing';

import { PsicologoGuard } from './psicologo.guard';

describe('PsicologoGuard', () => {
  let guard: PsicologoGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(PsicologoGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
