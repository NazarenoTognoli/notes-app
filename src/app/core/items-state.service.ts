import { Injectable, signal, effect } from '@angular/core';
//SERVICES
import { ItemsSyncService } from './items-sync.service';
//MODELS
import { Item } from '@app/shared/models/item.model';



@Injectable({
  providedIn: 'root'
})
export class ItemsStateService {

  multipleSelection = signal<boolean>(false);
  
  delButtonEnabled = signal<boolean>(false);
  
  editor = signal<boolean>(false);
  
  creation = signal<boolean>(false);

  creationData;
  
  editorData;

  constructor(private itemsSync: ItemsSyncService){
    this.editorData = signal<Item>(this.itemsSync.items()[0]);
    this.creationData = signal<Item>(this.itemsSync.items()[0]);
  }

  async handleConfirmEditor(): Promise<void> {
    try {
      if (this.editor()) {
        this.editor.set(false); //Salida rapida del editor
        await this.itemsSync.putItem(this.editorData());
      }
      if (this.creation()) {
        this.creation.set(false);
        await this.itemsSync.postItem(this.creationData());
      } 

      // Asegura sincronización
      await this.itemsSync.refreshItems(); 

    } catch (error) {
      console.error("Error en la actualización:", error);
    }
  }

}
