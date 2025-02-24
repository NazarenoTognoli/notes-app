import { Injectable, signal } from '@angular/core';
import { Item, ReactiveItem, dummyDatabase } from '@app/shared/models/item.model';
import { Observable, of } from 'rxjs';
import { ItemsStateService } from './items-state.service';

@Injectable({
  providedIn: 'root'
})
export class ItemsSyncService {

  reactiveItems: ReactiveItem[] = [];

  items = signal<Item[]>([]);

  firstLoad = signal<boolean>(true);

  constructor() { }

  getItems(): Observable<Promise<Item[]>> { //Observable<> is a class that shapes return
    // Simulate a server delay of 1 second before returning the data
    return of(dummyDatabase('get')); //Of creates the observer¿¿¿ //Pipe attaches a function to the return result
    //delay is an operator of rxjs which one integrates with pipe. 
  }

  putItem(data:Item){
    return dummyDatabase('put', data);
  }

  postItem(data:Item){
    return dummyDatabase('post', data);
  }

  deleteItem(data:Item){
    return dummyDatabase('delete', data);
  }

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
    const syncFlag:number = data.length !== 0 ? 250 : 0;
    setTimeout(()=>{
      this.firstLoad.set(false)
    }, syncFlag);
  }

  async refreshItems():Promise<void>{
    this.getItems().subscribe(async items => {
      try {
        const data = await items;
        this.firstLoad() ? this.firstLoadLogic(data) : this.items.set(data);
      }catch(error){
        console.error('Connection error ' + error);
      }
    });
  }

  syncReactiveItems(): void {
    const synchronizedReactiveItems = this.items().map(item => ({
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

}
