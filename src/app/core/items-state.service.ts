import { Injectable, signal, effect } from '@angular/core';
//SERVICES
import { GetItemsService } from '../core/get-items.service';
import { ItemsService } from '@app/core/items.service';
//MODELS
import { Item, ReactiveItem } from '@app/shared/models/item.model';



@Injectable({
  providedIn: 'root'
})
export class ItemsStateService {

  reactiveItems = signal<ReactiveItem[]>([]);
  multipleSelection = false;

  constructor(private itemsService: ItemsService){
    effect(()=> this.itemsService.items().length > 0 ? this.syncReactiveItems() : undefined, {allowSignalWrites:true});
  }

  syncReactiveItems():void {
    const synchronizedReactiveItems = this.itemsService.items().map(item => ({
      id: item.id,
      selected:false,
    }));
    this.reactiveItems.set([...synchronizedReactiveItems]);
    //This shouldn't change the reference of this.items otherwise infinite loop
  }
  
  refreshReactiveItems(state: ReactiveItem): void {
    const refreshedReactiveItems = this.reactiveItems().map(item =>
      item.id === state.id ? { ...item, selected: state.selected } : item
    );
    this.reactiveItems.set([...refreshedReactiveItems]);
    this.checkMultipleSelection();
  }

  checkMultipleSelection():void{
    this.multipleSelection = this.reactiveItems().some(item => item.selected);
  }

  handleCheckboxUpdate(state:ReactiveItem):void{
    this.refreshReactiveItems(state);
    this.checkMultipleSelection();
  }

  handleSelectButton(value:boolean):void{
    this.multipleSelection = value;
  }
}
