import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
//SERVICES
import { ItemsStateService } from '@app/core/items-state.service';
import { ItemsSyncService } from '@app/core/items-sync.service';
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

  constructor(public itemsState: ItemsStateService, public itemsSync:ItemsSyncService){}

  handleSelectButton(value: boolean): void {
    this.itemsState.multipleSelection.set(value);
  }

  handleCancelEditor(): void {
    //Evitamos actualizaciones inecesarias para evitar bugs y menor rendimiento
    this.itemsState.editor() ? this.itemsState.editor.set(false) : undefined;
    this.itemsState.creation() ? this.itemsState.creation.set(false) : undefined;
  }

  handleAddButton():void{
    this.itemsState.creation.set(true);
  }

  async handleDelButton():Promise<void>{
    let ids:string[] = [];
    for (let item of this.itemsSync.reactiveItems) {
      if (item.selected) ids.push(item.id);
    }
    this.itemsState.multipleSelection.set(false);
    try{
      ids.forEach(async id=>{
        const index = this.itemsSync.items().findIndex(item => item.id === id);
        const itemToDelete = this.itemsSync.items()[index];
        
        await this.itemsSync.deleteItem(itemToDelete);
        await this.itemsSync.refreshItems();
      });
    }
    catch(error){
      console.error("connection error " + error);
    }

  }

}
