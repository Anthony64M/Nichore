import { TestBed } from '@angular/core/testing';

import { PaintingsDataService } from './paintings-data.service';

describe('PaintingsDataService', () => {
  let service: PaintingsDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PaintingsDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
