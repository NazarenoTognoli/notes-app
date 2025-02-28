import { Component, HostListener, AfterViewInit, input } from '@angular/core';

import { ResizeService } from '@app/core/resize.service';

@Component({
  selector: 'app-resize-bar',
  standalone: true,
  imports: [],
  templateUrl: './resize-bar.component.html',
  styleUrl: './resize-bar.component.scss'
})
export class ResizeBarComponent implements AfterViewInit {
  constructor(private resize:ResizeService){}
  
  mouseStartPosition:number = 0;

  primaryElementCurrentWidth = input(()=>this.resize.toPixels(40));

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
    this.resize.primaryElementWidthPx.set(newValue());
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
    this.resize.primaryElementWidthPx.set(this.primaryElementCurrentWidth()());
  }
}
