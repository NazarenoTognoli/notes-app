import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
//SERVICES
import { ItemsSyncService } from '../items-container/items-sync.service';
import { GlobalService } from '@app/core/global.service';
import { SearchService } from '../search/search.service';
import { EditorService } from '../editor/editor.service';
import { HeaderService } from './header.service';
import { ItemsContainerService } from '../items-container/items-container.service';
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
    public itemsSync: ItemsSyncService,
    public global:GlobalService,
    public search:SearchService,
    public editor:EditorService,
    public header:HeaderService,
    public itemsContainer:ItemsContainerService
  ) {}

  handleSelectButton(value: boolean): void {
    this.itemsContainer.multipleSelection.set(value);
  }

  handleAddButton(): void {
    this.editor.creation.set(true);
  }

  async handleDelButton(): Promise<void> {
    const ids = this.itemsSync.reactiveItems
      .filter(item => item.selected)
      .map(item => item.id);

    this.itemsContainer.multipleSelection.set(false);

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
