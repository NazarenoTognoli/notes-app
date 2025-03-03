import { Injectable, computed, signal } from '@angular/core';
import { toPercentage } from '@app/shared/utils/units-conversion';
import { EditorService } from '../editor/editor.service';
@Injectable({
  providedIn: 'root'
})
export class ItemsContainerService {

  multipleSelection = signal<boolean>(false);

  itemsContainerWidthPxState = () => window.innerWidth - this.editor.editorWidthPxState();

  itemsContainerWidthPctState = computed(() => toPercentage(this.itemsContainerWidthPxState()));

  constructor(private editor:EditorService) { }
}
