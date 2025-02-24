//NG
import { Component, input, output, computed, signal, OnInit, effect, AfterViewInit } from '@angular/core';
//LLIBS
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';
//MODELS
import { Item, dummyDatabase, ReactiveItem } from '@app/shared/models/item.model';
//SERVICES
import { ItemsStateService } from '@app/core/items-state.service';
import { ItemsSyncService } from '@app/core/items-sync.service';

@Component({
  selector: 'app-item',
  standalone: true,
  imports: [MatCardModule, CommonModule, MatCheckboxModule],
  templateUrl: './item.component.html',
  styleUrl: './item.component.scss'
})
export class ItemComponent {

  hovered = false;

  selected = false;

  data = input.required<Item>();
  
  constructor(public itemsState:ItemsStateService, public itemsSync:ItemsSyncService){
    effect(()=>{
      if (!this.itemsState.multipleSelection()) this.handleCheckbox(false, true);
    }, {allowSignalWrites:true});
  }

  handleCheckbox(state: boolean, loop:boolean = false, firstLoad:boolean = false): void { //TODO: Cambiar parametros a destructuración de objetos
    if (this.selected !== state) this.selected = state;

    //solo es necesario ejecutar cuando son añadidos nuevos items porque el effect que sincronizaba comenzo a fallar
    firstLoad ? this.itemsSync.syncReactiveItems() : undefined; 

    this.itemsSync.refreshReactiveItems({ id: this.data().id, selected: state });
    //Se evita un loop infinito por el effect
    if (!loop) this.itemsState.multipleSelection.set(this.itemsSync.reactiveItems.some(item => item.selected));

    this.itemsState.delButtonEnabled = this.itemsSync.reactiveItems.some(item => item.selected);
  }

  handleEditor(): void {
    if(!this.itemsState.multipleSelection()) {
      if (this.itemsState.editor()) this.itemsState.editor.set(false);
      if (this.itemsState.creation()) this.itemsState.creation.set(false);
      this.itemsState.editorData.set(this.data());
      this.itemsState.editor.set(true);
    }
  }

  ngAfterViewInit(){
    this.handleCheckbox(false, false, true);
  }

}