import { TestBed } from '@angular/core/testing';

import { LivechartService } from './livechart.service';

describe('LivechartService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LivechartService = TestBed.get(LivechartService);
    expect(service).toBeTruthy();
  });
});
