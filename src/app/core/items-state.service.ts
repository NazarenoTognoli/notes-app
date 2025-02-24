import { Injectable, signal, effect } from '@angular/core';
//SERVICES
import { ItemsService } from '@app/core/items.service';
import { ItemsCrudService } from '@app/core/items-crud.service';
//MODELS
import { Item, ReactiveItem } from '@app/shared/models/item.model';



@Injectable({
  providedIn: 'root'
})
export class ItemsStateService {

  reactiveItems: ReactiveItem[] = [];
  multipleSelection = signal<boolean>(false);
  editor = signal<boolean>(false);
  creation = signal<boolean>(false);
  creationData;
  editorData;

  constructor(private itemsService: ItemsService, private itemsCrud: ItemsCrudService){
    this.editorData = signal<Item>(this.itemsService.items()[0]);
    this.creationData = signal<Item>(this.itemsService.items()[0]);
  }

  syncReactiveItems(): void {
    const synchronizedReactiveItems = this.itemsService.items().map(item => ({
      id: item.id,
      selected: false,
    }));
    this.reactiveItems = [...synchronizedReactiveItems];
  }

  refreshReactiveItems(state: ReactiveItem): void {
    this.reactiveItems = this.reactiveItems.map(item =>
      item.id === state.id ? { ...item, selected: state.selected } : item
    );
  }

  handleCheckboxUpdate(state: ReactiveItem, loop:boolean, firstLoad:boolean): void { //TODO: Cambiar parametros a destructuración de objetos
    //solo es necesario ejecutar cuando son añadidos nuevos items porque el effect que sincronizaba comenzo a fallar
    firstLoad ? this.syncReactiveItems() : undefined; 
    console.clear();
    console.log(this.itemsService.items());
    console.log(this.reactiveItems);

    this.refreshReactiveItems(state);
    //Se evita un loop infinito por el effect ubicado en item.component
    if (!loop) this.multipleSelection.set(this.reactiveItems.some(item => item.selected));
  }

  handleSelectButton(value: boolean): void {
    this.multipleSelection.set(value);
  }

  handleEditor(itemData: Item): void {
    this.editorData.set(itemData);
    this.editor.set(true);
  }

  handleCancelEditor(): void {
    //Evitamos actualizaciones inecesarias para evitar bugs y menor rendimiento e ihabilita
    this.editor() ? this.editor.set(false) : undefined;
    this.creation() ? this.creation.set(false) : undefined;
  }

  async handleConfirmEditor(): Promise<void> {
    try {
      if (this.editor()) {
        this.handleCancelEditor();
        await this.itemsCrud.putItem(this.editorData()); // Espera a que termine la actualización
      }
      if (this.creation()) {
        this.handleCancelEditor();
        await this.itemsCrud.postItem(this.creationData()); // Espera a que termine la creación
      } 

      // Ahora sí, refresca los ítems con datos actualizados
      await this.itemsService.refreshItems(); 

    } catch (error) {
      console.error("Error en la actualización:", error);
    }
  }

  handleAddButton():void{
    this.editor.set(false);
    this.creation.set(true);
  }

}
