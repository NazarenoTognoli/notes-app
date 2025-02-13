import { TestBed } from '@angular/core/testing';

import { ItemsStateService } from './items-state.service';

describe('ItemsStateService', () => {
  let service: ItemsStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ItemsStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
