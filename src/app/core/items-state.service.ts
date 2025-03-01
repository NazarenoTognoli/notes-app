import { Injectable, signal, effect } from '@angular/core';
//SERVICES
import { ItemsSyncService } from './items-sync.service';
import { ResizeService } from './resize.service';
//MODELS
import { Item } from '@app/shared/models/item.model';



@Injectable({
  providedIn: 'root'
})
export class ItemsStateService {

  isResolutionSmall:boolean = window.matchMedia('(max-width: 800px)').matches;


  searchInputFocus:boolean = false;

  multipleSelection = signal<boolean>(false);
  
  delButtonEnabled:boolean = false;
  
  editor = signal<boolean>(false);
  
  creation = signal<boolean>(false);

  creationData;
  
  editorData;

  constructor(private itemsSync: ItemsSyncService, private resize:ResizeService){
    this.editorData = signal<Item>(this.itemsSync.items()[0]);
    this.creationData = signal<Item>(this.itemsSync.items()[0]);
    window.matchMedia('(max-width: 800px)').addEventListener('change', (event) => {
      this.isResolutionSmall = event.matches;
    });
  }

  handleCancelEditor(): void {
    // Evitamos actualizaciones innecesarias para prevenir bugs y mejorar el rendimiento
    if (this.editor()) {
      this.editor.set(false);
    }
    if (this.creation()) {
      this.creation.set(false);
    }
    if(this.resize.primaryElementWidthPx()) this.resize.primaryElementWidthPxPrevious = this.resize.primaryElementWidthPx() > 400 ? this.resize.primaryElementWidthPx() : 400;
    this.resize.primaryElementWidthPx.set(0);
  }

  async handleConfirmEditor(): Promise<void> {
    try {
      if (this.editor()) {
        this.handleCancelEditor(); //Salida rapida del editor
        await this.itemsSync.putItem(this.editorData());
      }
      else if (this.creation()) {
        this.handleCancelEditor();
        await this.itemsSync.postItem(this.creationData());
        this.creationData.set({...this.creationData(), content:""});
      } 
      else {
        throw new Error("no flag matched");
      }
      // Asegura sincronización
      await this.itemsSync.refreshItems(); 

    } catch (error) {
      console.error("Error en la actualización:", error);
    }
  }

}
