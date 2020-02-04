import { TestBed } from '@angular/core/testing';

import { MydbService } from './mydb.service';

describe('MydbService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MydbService = TestBed.get(MydbService);
    expect(service).toBeTruthy();
  });
});
