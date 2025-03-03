import { Component, HostListener, input, AfterViewInit } from '@angular/core';
import { ResizeService } from './resize.service';
import { toPixels } from '@app/shared/utils/units-conversion';
import { EditorService } from '../editor/editor.service';

@Component({
  selector: 'app-resize',
  standalone: true,
  imports: [],
  templateUrl: './resize.component.html',
  styleUrl: './resize.component.scss'
})
export class ResizeComponent implements AfterViewInit {
  constructor(private resize:ResizeService, private editor:EditorService){}
  
  mouseStartPosition:number = 0;

  primaryElementCurrentWidth = input(()=>toPixels(40));

  initialWidth:number = 0;

  @HostListener('mousedown', ['$event'])
  onMouseDown(event:MouseEvent){
    console.log("executed mousedown")
    this.resize.isResizing = true;
    this.mouseStartPosition = event.clientX;
    this.initialWidth = this.primaryElementCurrentWidth()();
    document.body.classList.add('no-select');
    window.addEventListener('mousemove', this.onMouseMoveBound);
    window.addEventListener('mouseup', this.onMouseUpBound);
  }

  private onMouseMoveBound = (event: MouseEvent) => this.onMouseMove(event);

  onMouseMove(event:MouseEvent){
    if(!this.resize.isResizing) return;
    const newValue = () => this.initialWidth - (event.clientX - this.mouseStartPosition);
    if (newValue() >= window.innerWidth - 400) return;
    if (newValue() <= 400) return;
    this.editor.editorWidthPxState.set(newValue());
  }

  private onMouseUpBound = (event: MouseEvent) => this.onMouseUp(event);

  onMouseUp(event: MouseEvent) {
    console.log("executed mouseup");
    this.resize.isResizing = false; 
    document.body.classList.remove('no-select');
    // Eliminamos el evento de mouseup global para evitar fugas de memoria
    window.removeEventListener('mousemove', this.onMouseMoveBound);
    window.removeEventListener('mouseup', this.onMouseUpBound);
  }
  ngAfterViewInit(){
    this.editor.editorWidthPxState.set(this.primaryElementCurrentWidth()());
  }

}
