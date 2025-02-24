import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
//SERVICES
import { ItemsStateService } from '@app/core/items-state.service';
import { ItemsSyncService } from '@app/core/items-sync.service';

@Component({
  selector: '[app-header]',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  constructor(public itemsState: ItemsStateService, private itemsSync:ItemsSyncService){}

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

}
