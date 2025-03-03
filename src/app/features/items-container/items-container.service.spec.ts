import { TestBed } from '@angular/core/testing';

import { ItemsContainerService } from './items-container.service';

describe('ItemsContainerService', () => {
  let service: ItemsContainerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ItemsContainerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
