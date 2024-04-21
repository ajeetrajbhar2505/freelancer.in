import { TestBed } from '@angular/core/testing';

import { ChangeDetectionServiceService } from './change-detection-service.service';

describe('ChangeDetectionServiceService', () => {
  let service: ChangeDetectionServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChangeDetectionServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
