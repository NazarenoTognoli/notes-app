import { Injectable, computed, signal, OnInit } from '@angular/core';
import { toPercentage } from '@app/shared/utils/units-conversion';
import { EditorService } from '../editor/editor.service';
import { ItemsSyncService } from './items-sync.service';
import { Item } from '@app/shared/models/item.model';
@Injectable({
  providedIn: 'root'
})
export class ItemsContainerService implements OnInit {

  dataStanding:Item;

  confirmActionFlag = signal<boolean>(false);

  multipleSelection = signal<boolean>(false);

  itemsContainerWidthPxState = () => window.innerWidth - this.editor.editorWidthPxState();

  itemsContainerWidthPctState = computed(() => toPercentage(this.itemsContainerWidthPxState()));

  constructor(private editor:EditorService, private itemsSync:ItemsSyncService) {
    this.dataStanding = itemsSync.items()[0];
  }

  ngOnInit(){
  }
}
