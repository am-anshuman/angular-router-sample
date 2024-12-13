import { TestBed } from '@angular/core/testing';

import { BuildUpdateService } from './build-update.service';

describe('BuildUpdateService', () => {
  let service: BuildUpdateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BuildUpdateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
