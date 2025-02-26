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

  constructor(
    public itemsState: ItemsStateService,
    public itemsSync: ItemsSyncService
  ) {
    effect(
      () => {
        if (!this.itemsState.multipleSelection()) {
          this.handleCheckbox({ state: false, loop: true });
        }
      },
      { allowSignalWrites: true }
    );
  }

  itemEditingState(): boolean {
    const editorDataId = this.itemsState.editorData()?.id ?? '';
    const itemId = this.data().id;
    return editorDataId === itemId && this.itemsState.editor();
  }

  handleCheckbox({ state, loop = false }: { state: boolean; loop?: boolean }): void {
    if (this.selected !== state) {
      this.selected = state;
    }
    
    this.itemsSync.refreshReactiveItems({ id: this.data().id, selected: state });
    
    const hasSelected = this.itemsSync.reactiveItems.some(item => item.selected);
    if (!loop) {
      this.itemsState.multipleSelection.set(hasSelected);
    }
    this.itemsState.delButtonEnabled = hasSelected;
  }

  handleEditor(): void {
    if (this.itemsState.multipleSelection()) {
      return;
    }

    // Reseteamos los estados de edición y creación
    this.itemsState.editor.set(false);
    this.itemsState.creation.set(false);
    
    this.itemsState.editorData.set(this.data());
    this.itemsState.editor.set(true);
  }

  ngAfterViewInit(): void {
    // Solo se ejecuta al añadirse para sincronizar estados
    this.itemsSync.syncReactiveItems();
  }
}
