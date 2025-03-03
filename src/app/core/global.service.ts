import { Injectable } from '@angular/core';
import { EditorService } from '@app/features/editor/editor.service';
@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  isResolutionSmall:boolean = window.matchMedia('(max-width: 800px)').matches;

  constructor(private editor:EditorService) { 
    window.matchMedia('(max-width: 800px)').addEventListener('change', (event) => {
      this.isResolutionSmall = event.matches;
    });
    window.addEventListener('resize', ()=>{this.editor.syncEditorWidthPxState()});
  }
}
