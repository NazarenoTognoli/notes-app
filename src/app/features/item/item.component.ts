//NG
import { Component, input, output, computed, signal, OnInit, effect, AfterViewInit } from '@angular/core';
//LLIBS
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';
//MODELS
import { Item, dummyDatabase, ReactiveItem } from '@app/shared/models/item.model';
//SERVICES
import { ItemsSyncService } from '../items-container/items-sync.service';
import { EditorService } from '../editor/editor.service';
import { HeaderService } from '../header/header.service';
import { ItemsContainerService } from '../items-container/items-container.service';

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
    public itemsSync: ItemsSyncService,
    public editor:EditorService,
    private header:HeaderService,
    public itemsContainer:ItemsContainerService
  ) {
    effect(
      () => {
        if (!this.itemsContainer.multipleSelection()) {
          this.handleCheckbox({ state: false, loop: true });
        }
      },
      { allowSignalWrites: true }
    );
  }

  itemEditingState(): boolean {
    const editorDataId = this.editor.editorData()?.id ?? '';
    const itemId = this.data().id;
    return editorDataId === itemId && this.editor.editor();
  }

  handleCheckbox({ state, loop = false }: { state: boolean; loop?: boolean }): void {
    if (this.selected !== state) {
      this.selected = state;
    }
    
    this.itemsSync.refreshReactiveItems({ id: this.data().id, selected: state });
    
    const hasSelected = this.itemsSync.reactiveItems.some(item => item.selected);

    if (!loop) {
      this.itemsContainer.multipleSelection.set(hasSelected);
    }
    
    this.header.delButtonEnabled = hasSelected;
  }

  handleEditor(): void {
    if (this.itemsContainer.multipleSelection()) {
      return;
    }

    // Reseteamos los estados de edición y creación
    this.editor.editor.set(false);
    this.editor.creation.set(false);
    
    this.editor.editorData.set(this.data());
    this.editor.editor.set(true);
  }

  ngAfterViewInit(): void {
    // Solo se ejecuta al añadirse para sincronizar estados
    this.itemsSync.syncReactiveItems();
  }
}
