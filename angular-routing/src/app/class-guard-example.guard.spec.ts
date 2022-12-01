import { TestBed } from '@angular/core/testing';

import { ClassGuardExampleGuard } from './class-guard-example.guard';

describe('ClassGuardExampleGuard', () => {
  let guard: ClassGuardExampleGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ClassGuardExampleGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
