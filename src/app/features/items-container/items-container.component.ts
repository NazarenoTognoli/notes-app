import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemsSyncService } from './items-sync.service';
import { SearchService } from '../search/search.service';
import { ItemsContainerService } from './items-container.service';
import { ItemComponent } from '../item/item.component';
import { EditorService } from '../editor/editor.service';

@Component({
  selector: 'app-items-container',
  standalone: true,
  imports: [CommonModule, ItemComponent],
  templateUrl: './items-container.component.html',
  styleUrl: './items-container.component.scss'
})
export class ItemsContainerComponent {
  constructor(public itemsSync:ItemsSyncService, public search:SearchService, public itemsContainerService:ItemsContainerService, public editor:EditorService){}

  handleDiscardChanges(){
    // Reseteamos los estados de edición y creación
    this.editor.editor.set(false);
    this.editor.creation.set(false);
    
    this.editor.editorData.set(this.itemsContainerService.dataStanding);
    this.editor.editor.set(true);
    this.itemsContainerService.confirmActionFlag.set(false);
  }

}
