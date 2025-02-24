import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { ItemsStateService } from '@app/core/items-state.service';
import { ItemsSyncService } from '@app/core/items-sync.service';

@Component({
  selector: 'app-editor',
  standalone: true,
  imports: [],
  templateUrl: './editor.component.html',
  styleUrl: './editor.component.scss'
})
export class EditorComponent implements AfterViewInit {
  @ViewChild('editor') editorElement!: ElementRef<HTMLTextAreaElement>;

  constructor(public itemsState:ItemsStateService, private itemsSync:ItemsSyncService){}

  previousData():string {
    if(this.itemsState.editor()){
      return this.itemsState.editorData().content;
    } else {
      return "";
    }
  }

  handleEdition(contentValue:string){
    const data = {...this.itemsState.editorData(), content:contentValue, modificationDate:new Date().toString()};
    this.itemsState.editorData.set(data);
  }

  handleCreation(contentValue:string){
    let newId = () => this.itemsSync.items().length + 1;
    const date = new Date().toString();
    const data = {id:newId(), modificationDate: date, creationDate: date, content:contentValue};
    this.itemsState.creationData.set(data);
  }

  ngAfterViewInit() {
    this.editorElement.nativeElement.value = this.previousData();
    this.editorElement.nativeElement.addEventListener('input', (event:Event)=>{
      const contentValue = (event.target as HTMLTextAreaElement).value;
      this.itemsState.editor() ? this.handleEdition(contentValue) : undefined;
      this.itemsState.creation() ? this.handleCreation(contentValue) : undefined;
    });
    this.editorElement.nativeElement.focus();
  }
}
