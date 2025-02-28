import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
//SERVICES
import { ItemsStateService } from '@app/core/items-state.service';
import { ItemsSyncService } from '@app/core/items-sync.service';
import { ResizeService } from '@app/core/resize.service';
//COMPONENT
import { SearchComponent } from '../search/search.component';

@Component({
  selector: '[app-header]',
  standalone: true,
  imports: [CommonModule, SearchComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  constructor(
    public itemsState: ItemsStateService,
    public itemsSync: ItemsSyncService,
    private resize:ResizeService
  ) {}

  handleSelectButton(value: boolean): void {
    this.itemsState.multipleSelection.set(value);
  }

  handleAddButton(): void {
    this.itemsState.creation.set(true);
  }

  async handleDelButton(): Promise<void> {
    const ids = this.itemsSync.reactiveItems
      .filter(item => item.selected)
      .map(item => item.id);

    this.itemsState.multipleSelection.set(false);

    try {
      //ciclo for…of para procesar cada eliminación de forma secuencial
      for (const id of ids) {
        const items = this.itemsSync.items();
        const index = items.findIndex(item => item.id === id);
        if (index !== -1) {
          const itemToDelete = items[index];
          await this.itemsSync.deleteItem(itemToDelete);
          await this.itemsSync.refreshItems();
        }
      }
    } catch (error) {
      console.error("connection error", error);
    }
  }
}
