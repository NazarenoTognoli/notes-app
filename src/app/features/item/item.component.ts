import { Component, input, output, computed, signal, OnInit, effect } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { Item, ReactiveItem } from '@app/shared/models/item.model';

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

  constructor(){
    effect(()=>{
      if (!this.multipleSelection?.()) this.selected = false;
    });
  }

  data = input.required<Item>();

  multipleSelection = input<boolean>();

  checkboxUpdate = output<ReactiveItem>();

  updateCheckbox = (state:boolean) => {
    if (this.selected !== state) this.selected = state;
    this.checkboxUpdate.emit({ id: this.data().id, selected: state });
  }

}