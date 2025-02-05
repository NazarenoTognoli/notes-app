//ANGULAR
import { CommonModule } from '@angular/common';
import { Component, signal, effect } from '@angular/core';
import { RouterOutlet } from '@angular/router';
//SERVICES
import {GetItemsService} from './core/get-items.service';
//ANGULAR MATERIAL
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatGridListModule} from '@angular/material/grid-list';
//COMPONENTS
import { ItemComponent} from '@app/features/item/item.component';
//MODELS
import { Item, ReactiveItem } from '@app/shared/models/item.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet, 
    MatButtonModule, 
    MatIconModule, 
    ItemComponent, 
    CommonModule, 
    MatGridListModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  items = signal<Item[]>([]);
  reactiveItems:ReactiveItem[] = [];
  multipleSelection = false;

  constructor(private getItemsService: GetItemsService){
    this.items.set(this.getItemsService.getItems());
    effect(()=>{
      this.reactiveItems = this.items().map(item=>({
        id:item.id,
        selected:false,
      }));
    });
  }

  selectionSome(state:ReactiveItem):void{
    if (!this.reactiveItems) {
      console.error("reactiveItems undefined in selectionSome");
      return;
    }
    this.reactiveItems = this.reactiveItems.map(item => {
      if (item.id === state.id) {
        return {
          ...item,
          selected: state.selected 
        };
      }
      return item;
    });
    this.multipleSelection = this.reactiveItems.some(item => item.selected);
  }
}
