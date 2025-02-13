import { Injectable, signal, effect } from '@angular/core';
import { GetItemsService } from '../core/get-items.service';
import { Item, ReactiveItem } from '@app/shared/models/item.model';

@Injectable({
  providedIn: 'root'
})
export class ItemsStateService {

  constructor() { }
}
