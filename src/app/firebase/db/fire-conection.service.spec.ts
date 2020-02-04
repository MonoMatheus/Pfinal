import { TestBed } from '@angular/core/testing';

import { FireConectionService } from './fire-conection.service';

describe('FireConectionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FireConectionService = TestBed.get(FireConectionService);
    expect(service).toBeTruthy();
  });
});
