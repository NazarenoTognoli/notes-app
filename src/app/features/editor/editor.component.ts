import { Component, AfterViewInit, ViewChild, ElementRef, effect } from '@angular/core';
import { ItemsStateService } from '@app/core/items-state.service';
import { ItemsSyncService } from '@app/core/items-sync.service';
import { generateId } from '@app/shared/models/item.model';

@Component({
  selector: 'app-editor',
  standalone: true,
  imports: [],
  templateUrl: './editor.component.html',
  styleUrl: './editor.component.scss'
})
export class EditorComponent implements AfterViewInit {
  @ViewChild('editor') editorElement!: ElementRef<HTMLTextAreaElement>;
  viewInit = false;

  constructor(public itemsState:ItemsStateService, private itemsSync:ItemsSyncService){
    effect(()=>{
      if (this.viewInit && (this.itemsState.editor() || this.itemsState.creation())){ this.editorElement.nativeElement.value = this.previousData() }
    });
  }

  previousData():string {
    if(this.itemsState.editor()){
      return this.itemsState.editorData().content;
    }
    else if (this.itemsState.creation() && this.itemsState.creationData()){
      return this.itemsState.creationData().content;
    }
    else {
      return "";
    }
  }

  handleEdition(contentValue:string){
    const data = () => ({...this.itemsState.editorData(), content:contentValue, modificationDate:new Date().toString()});
    this.itemsState.editorData.set(data());
  }

  handleCreation(contentValue:string){
    const date = new Date().toString();
    const data = () => ({id:generateId(), modificationDate: date, title: "title undefined", content:contentValue});
    this.itemsState.creationData.set(data());
  }

  ngAfterViewInit() {
    this.viewInit = true;
    this.editorElement.nativeElement.value = this.previousData();
    this.editorElement.nativeElement.addEventListener('input', (event:Event)=>{
      const contentValue = (event.target as HTMLTextAreaElement).value;
      this.itemsState.editor() ? this.handleEdition(contentValue) : undefined;
      this.itemsState.creation() ? this.handleCreation(contentValue) : undefined;
    });
    this.editorElement.nativeElement.focus();
  }
}
