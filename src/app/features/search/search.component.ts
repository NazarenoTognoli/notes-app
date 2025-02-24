import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ItemsStateService } from '@app/core/items-state.service';
import { ItemsSyncService } from '@app/core/items-sync.service';
import { Item } from '@app/shared/models/item.model';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent {
  
  constructor(public itemsSync:ItemsSyncService){}

}
