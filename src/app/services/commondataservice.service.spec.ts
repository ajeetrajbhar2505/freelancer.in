import { TestBed } from '@angular/core/testing';

import { CommondataserviceService } from './commondataservice.service';

describe('CommondataserviceService', () => {
  let service: CommondataserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommondataserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
