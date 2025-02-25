import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ItemsStateService } from '@app/core/items-state.service';
import { ItemsSyncService } from '@app/core/items-sync.service';
import { Item } from '@app/shared/models/item.model';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent {
  
  constructor(public itemsSync:ItemsSyncService, private itemsState:ItemsStateService){}

  clearSearchTerm(){
    this.itemsSync.searchTerm = "";
  }

  onFocus(){
    this.itemsState.searchInputFocus = true;
  }

  onBlur(){
    this.itemsState.searchInputFocus = false;
  }

}
