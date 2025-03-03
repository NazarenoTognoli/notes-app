import { TestBed } from '@angular/core/testing';

import { ItemsSyncService } from './items-sync.service';

describe('ItemsSyncService', () => {
  let service: ItemsSyncService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ItemsSyncService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
