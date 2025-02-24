import { Injectable, signal } from '@angular/core';
import { ItemsCrudService } from '@app/core/items-crud.service';
import { Item } from '@app/shared/models/item.model';
import { ItemsStateService } from './items-state.service';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {
  items = signal<Item[]>([]);
  firstLoad = signal<boolean>(true);
  idleItem:Item = this.items()[0];

  constructor(private itemsCrud: ItemsCrudService) { }

  firstLoadLogic(data:Item[]):void{
    let time = 0;
    const itemsStack:Item[] = [];
    data.forEach(item => {
      setTimeout(()=>{
        itemsStack.push(item);
        const newReference = [...itemsStack];
        this.items.set(newReference);
      }, time += 250);
    });
    this.firstLoad.set(false);
  }

  async refreshItems():Promise<void>{
    this.itemsCrud.getItems().subscribe(async items => {
      try {
        const data = await items;
        this.firstLoad() ? this.firstLoadLogic(data) : this.items.set(data);
      }catch(error){
        console.error('Connection error ' + error);
      }
    });
  }

  handleAddButton(){}

}
