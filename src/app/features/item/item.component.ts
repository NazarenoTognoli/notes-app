//NG
import { Component, input, output, computed, signal, OnInit, effect } from '@angular/core';
//LLIBS
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';
//MODELS
import { Item, dummyDatabase } from '@app/shared/models/item.model';
//SERVICES
import { ItemsStateService } from '@app/core/items-state.service';
import { ItemsService } from '@app/core/items.service';

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
  
  constructor(public states:ItemsStateService){
    effect(()=>{
      if (!this.states.multipleSelection()) this.updateCheckbox(false, true);
    }, {allowSignalWrites:true});
  }

  updateCheckbox(state:boolean, loop:boolean = false) {
    if (this.selected !== state) this.selected = state;
    this.states.handleCheckboxUpdate({ id: this.data().id, selected: state }, loop);
  }

  handleEditorTrigger(){
    if(!this.states.multipleSelection() && !this.states.editor()) this.states.handleEditor(this.data());
  }

}