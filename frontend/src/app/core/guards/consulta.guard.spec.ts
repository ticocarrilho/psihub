import { TestBed } from '@angular/core/testing';

import { ConsultaGuard } from './consulta.guard';

describe('ConsultaGuard', () => {
  let guard: ConsultaGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ConsultaGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
