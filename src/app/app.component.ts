import { Component, signal, AfterViewInit, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import {GetItemsService} from './core/get-items.service';

import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatGridListModule} from '@angular/material/grid-list';

import { ItemComponent} from '@app/features/item/item.component';
import { Item, ReactiveItemOutput } from '@app/shared/models/item.model';
import { Reactive } from '@angular/core/primitives/signals';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatButtonModule, MatIconModule, ItemComponent, CommonModule, MatGridListModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  items:Item[] = [];
  reactiveItems:ReactiveItemOutput[] = [];
  multipleSelection = false;

   ngOnChanges(changes: SimpleChanges): void {
    if (changes['items'] && this.items) {
      this.reactiveItems = this.items.map(item => ({
        id: item.id,        // Extract the id
        selected: false     // Add the selected property and set it to false by default
      }));
      console.log("UPDATED reactive items " + JSON.stringify(this.reactiveItems)); // Log the modified array with 'selected' property
    }
  }

  constructor(private getItemsService: GetItemsService){}

  selectionSome(state:ReactiveItemOutput){
    if (this.reactiveItems) {
      // Map through reactiveItems and return a new object with updated 'selected' status
      this.reactiveItems = this.reactiveItems.map(item => {
        // Check if the id matches
        if (item.id === state.id) {
          // Return updated object
          console.log("Id matched");
          return {
            ...item,          // Spread the existing item
            selected: state.selected  // Update the 'selected' property
          };
        }
        // If no match, return the item as is
        console.error("no id matched in selection some at app component");
        return item;
      });
      console.log("UPDATED reactive items (If there is no id match error) " + JSON.stringify(this.reactiveItems));
      this.multipleSelection = this.reactiveItems.some(item => item.selected);
    } else {
      console.error("reactiveItems undefined in selectionSome");
    }

  }
  
  ngOnInit(){
    this.items = this.getItemsService.getItems();
    console.log("items " + JSON.stringify(this.items));
    if(this.items){
      this.reactiveItems = this.items.map(item => ({
        id: item.id,        // Extract the id
        selected: false     // Add the selected property and set it to false by default
      }));
      console.log("GENERATED Reactive Items " + JSON.stringify(this.reactiveItems));
    } else {
      console.error("items undefined in app component");
    }
  }
}
