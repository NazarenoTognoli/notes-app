import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ItemsSyncService } from '../items-container/items-sync.service';
import { SearchService } from './search.service';
import { Item } from '@app/shared/models/item.model';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent {
  
  constructor(public itemsSync:ItemsSyncService, public search:SearchService){}

  clearSearchTerm(){
    this.search.searchTerm = "";
  }

  onFocus(){
    this.search.searchInputFocus = true;
  }

  onBlur(){
    this.search.searchInputFocus = false;
  }

}
