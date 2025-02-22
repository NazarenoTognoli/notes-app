import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { ItemsStateService } from '@app/core/items-state.service';

@Component({
  selector: 'app-editor',
  standalone: true,
  imports: [],
  templateUrl: './editor.component.html',
  styleUrl: './editor.component.scss'
})
export class EditorComponent implements AfterViewInit {
  @ViewChild('editor') editorElement!: ElementRef<HTMLTextAreaElement>;

  constructor(public itemsState:ItemsStateService){}

  previousData():string {
    return this.itemsState.editorData().content;
  }

  ngAfterViewInit() {
    this.editorElement.nativeElement.value = this.previousData();
    this.editorElement.nativeElement.addEventListener('input', (event:Event)=>{
      const contentValue = (event.target as HTMLTextAreaElement).value;
      const data = {...this.itemsState.editorData(), content:contentValue, modificationDate:new Date().toString()};
      this.itemsState.editorData.set(data);
    });
    this.editorElement.nativeElement.focus();
  }
}
