import { Injectable } from '@angular/core';
import { Item } from '@app/shared/models/item.model';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  searchInputFocus:boolean = false;
  searchTerm: string = '';

  constructor() {}

}
