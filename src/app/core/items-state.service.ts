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

  reactiveItems: ReactiveItem[] = [];  // 'reactiveItems' ahora es una propiedad normal (array de objetos)
  multipleSelection = signal<boolean>(false);  // Señal para la selección múltiple
  editor = signal<boolean>(false);  // Señal para el estado del editor
  editorData;// Señal para los datos del editor

  constructor(private itemsService: ItemsService, private itemsCrud: ItemsCrudService){
    this.editorData = signal<Item>(this.itemsService.items()[0]);
    
    effect(() => {
      this.itemsService.items().length > 0 ? this.syncReactiveItems() : undefined;
    }, { allowSignalWrites: true });
  
  }

  syncReactiveItems(): void {
    const synchronizedReactiveItems = this.itemsService.items().map(item => ({
      id: item.id,
      selected: false,
    }));
    this.reactiveItems = [...synchronizedReactiveItems];  // Asignamos el array a la propiedad 'reactiveItems'
  }

  refreshReactiveItems(state: ReactiveItem): void {
    this.reactiveItems = this.reactiveItems.map(item =>
      item.id === state.id ? { ...item, selected: state.selected } : item
    );
  }

  handleCheckboxUpdate(state: ReactiveItem, loop:boolean): void {
    this.refreshReactiveItems(state);
    if (!loop) this.multipleSelection.set(this.reactiveItems.some(item => item.selected));  // Usamos la señal para actualizar el estado de selección
  }

  handleSelectButton(value: boolean): void {
    this.multipleSelection.set(value);  // Actualiza la señal de selección múltiple
  }

  handleEditor(itemData: Item): void {
    this.editorData.set(itemData);  // Establece los datos del editor a través de la señal
    this.editor.set(true);  // Activa el editor
  }

  handleCancelEditor(): void {
    this.editor.set(false);  // Desactiva el editor
  }

  handleConfirmEditor(): void {
    this.editor.set(false);
    this.itemsCrud.putItem(this.editorData());
    this.itemsService.refreshItems();
  }

  //Entonces, necesito los datos del item que es seleccionado y que se pasen al EditorComponent
  //El editor compoent muestra esos datos
  //La edicción de los demas items debe ser de forma segura inhibida para evitar bugs
  //Cambiar los botones de add y select por confirm y cancel
  //El usuario edita los datos del item y hace click in confirm o cancel, si es cancel se revierten los procesos
  //Si es confirm entonces se arma un nuevo esquema de datos y se envia como solicitud a dummyDatabase
  //Se hace un refresh del servidor

}
