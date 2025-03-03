import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemsSyncService } from './items-sync.service';
import { SearchService } from '../search/search.service';
import { ItemComponent } from '../item/item.component';

@Component({
  selector: 'app-items-container',
  standalone: true,
  imports: [CommonModule, ItemComponent],
  templateUrl: './items-container.component.html',
  styleUrl: './items-container.component.scss'
})
export class ItemsContainerComponent {
  constructor(public itemsSync:ItemsSyncService, public search:SearchService){}
}
