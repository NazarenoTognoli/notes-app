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

  data = input.required<Item>();

  selectionUpdate = output<ReactiveItem>();

  multipleSelection = input<boolean>();

  hovered = false;

  updateCheckbox = (state:boolean) => {
    this.selectionUpdate.emit({ id: this.data().id, selected: state });
  }

}