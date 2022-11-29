import { TestBed } from '@angular/core/testing';

import { FavsService } from './favs.service';

describe('FavsService', () => {
  let service: FavsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FavsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
