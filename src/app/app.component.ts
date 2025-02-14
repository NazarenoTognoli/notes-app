//ANGULAR
import { CommonModule } from '@angular/common';
import { Component, signal, effect, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
//LIBRARIES
import { of, from } from 'rxjs';
import { concatMap, delay } from 'rxjs/operators';
//SERVICES
import {GetItemsService} from './core/get-items.service';
//ANGULAR MATERIAL
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatGridListModule} from '@angular/material/grid-list';
//COMPONENTS
import { ItemComponent} from '@app/features/item/item.component';
import { HeaderComponent } from '@app/features/header/header.component';
//MODELS
import { Item, ReactiveItem, dummyDatabase } from '@app/shared/models/item.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet, 
    MatButtonModule, 
    MatIconModule, 
    ItemComponent, 
    CommonModule, 
    MatGridListModule,
    HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  items = signal<Item[]>([]);
  reactiveItems = signal<ReactiveItem[]>([]);
  multipleSelection = false;
  firstLoad = true;

  constructor(private getItemsService: GetItemsService){
    effect(()=> this.items().length > 0 ? this.syncReactiveItems() : undefined, {allowSignalWrites:true});
  }

  syncReactiveItems():void {
    const synchronizedReactiveItems = this.items().map(item => ({
      id: item.id,
      selected:false,
    }));
    this.reactiveItems.set([...synchronizedReactiveItems]);
    //This shouldn't change the reference of this.items otherwise infinite loop
  }

  async checkFirstLoad(data:Promise<Item[]>):Promise<void>{
    try {
      const items = await data;
      if (this.firstLoad) {
        let time = 0;
        const itemsStack:Item[] = [];
        items.forEach(item => {
          setTimeout(()=>{
            itemsStack.push(item);
            const newReference = [...itemsStack];
            this.items.set(newReference);
          }, time += 250);
        });
        this.firstLoad = false;
      } 
      else {
        this.items.set(items);
      }
    }catch(error){
      console.error("connection error");
    }
  }

  async refreshItems():Promise<void>{
    this.getItemsService.getItems().subscribe(items => {
      this.checkFirstLoad(items);
    });
  }

  refreshReactiveItems(state:ReactiveItem):void{
    const refreshedReactiveItems = this.reactiveItems().map(item => 
      item.id === state.id ? {...item, selected:state.selected} : item
    ); 
    this.reactiveItems.set([...refreshedReactiveItems]);
  }

  checkMultipleSelection():void{
    this.multipleSelection = this.reactiveItems().some(item => item.selected);
  }

  handleCheckboxUpdate(state:ReactiveItem):void{
    this.refreshReactiveItems(state);
    this.checkMultipleSelection();
  }

  ngOnInit(){
    this.refreshItems();
  }
}