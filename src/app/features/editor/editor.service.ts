import { Injectable, signal, computed } from '@angular/core';
import { Item } from '@app/shared/models/item.model';
import { toPercentage } from '@app/shared/utils/units-conversion';
import { ItemsSyncService } from '../items-container/items-sync.service';
@Injectable({
  providedIn: 'root'
})
export class EditorService {
  editorWidthPxCurrent = () => 0;
  editorWidthPxState = signal<number>(0);
  editorWidthPxPreviousState = 0;
  editorWidthPctState = computed(() => toPercentage(this.editorWidthPxState()));
  //EDITOR STATE LOGIC HERE
  editor = signal<boolean>(false);
  //EDITOR STATE LOGIC HERE
  creation = signal<boolean>(false);
  //EDITOR STATE LOGIC HERE
  creationData;
  //EDITOR STATE LOGIC HERE
  editorData;

  constructor(private itemsSync: ItemsSyncService){
    this.editorData = signal<Item>(this.itemsSync.items()[0]);
    this.creationData = signal<Item>(this.itemsSync.items()[0]);
  }

  normalizeSizeAndTrackPrevious = () => {
    if(this.editorWidthPxState()) this.editorWidthPxPreviousState = this.editorWidthPxState();
    this.editorWidthPxState.set(0);
  }

  syncEditorWidthPxState = ()=> {
    const {editorWidthPxCurrent} = this;
    this.editorWidthPxState.set(editorWidthPxCurrent());
    if (editorWidthPxCurrent() >= (window.innerWidth - 400) && this.editorWidthPxState()) {
      this.editorWidthPxState.set(window.innerWidth - 400);
    }
    else if(editorWidthPxCurrent() <= 400 && this.editorWidthPxState()){
      this.editorWidthPxState.set(400);
    }
  }

  handleCancelEditor(): void {
    // Evitamos actualizaciones innecesarias para prevenir bugs y mejorar el rendimiento
    if (this.editor()) {
      this.editor.set(false);
    }
    if (this.creation()) {
      this.creation.set(false);
    }
    this.normalizeSizeAndTrackPrevious();
  }

  async handleConfirmEditor(): Promise<void> {
    try {
      if (this.editor()) {
         //Salida rapida del editor
        this.handleCancelEditor();
        await this.itemsSync.putItem(this.editorData());
      }
      else if (this.creation()) {
        this.handleCancelEditor();
        await this.itemsSync.postItem(this.creationData());
        this.creationData.set({...this.creationData(), content:"", title:""});
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
