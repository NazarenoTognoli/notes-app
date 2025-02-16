//NG
import { Component, input, output, computed, signal, OnInit, effect } from '@angular/core';
//LLIBS
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';
//MODELS
import { Item, ReactiveItem } from '@app/shared/models/item.model';
//SERVICES
import { ItemsStateService } from '@app/core/items-state.service';

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
      if (!this.states.multipleSelection()) this.updateCheckbox(false);
    });
  }

  updateCheckbox(state:boolean) {
    if (this.selected !== state) this.selected = state;
    this.states.handleCheckboxUpdate({ id: this.data().id, selected: state })
  }

}