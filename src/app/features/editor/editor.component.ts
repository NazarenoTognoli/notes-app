import { Component, AfterViewInit, ViewChild, ElementRef, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ItemsStateService } from '@app/core/items-state.service';
import { ItemsSyncService } from '@app/core/items-sync.service';
import { generateId } from '@app/shared/models/item.model';

@Component({
  selector: 'app-editor',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './editor.component.html',
  styleUrl: './editor.component.scss'
})
export class EditorComponent implements AfterViewInit {
  @ViewChild('editor') editorElement!: ElementRef<HTMLTextAreaElement>;
  viewInit = false;
  titleInputValue:string = "title undefined";

  constructor(public itemsState:ItemsStateService, private itemsSync:ItemsSyncService){
    effect(()=>{
      if (this.viewInit && (this.itemsState.editor() || this.itemsState.creation())){ 
        this.editorElement.nativeElement.value = this.previousData(); 
        this.titleInputValue = this.previousData(true);
      }
    });
  }
  onTitleInput(event:Event){
    const inputValue = (event.target as HTMLInputElement).value;
    this.itemsState.editor() && this.handleEdition(inputValue, true);
    this.itemsState.creation() && this.handleCreation(inputValue, true);
  }

  previousData(title:boolean = false):string {
    if(this.itemsState.editor() && !title){
      return this.itemsState.editorData().content;
    }
    else if (this.itemsState.creation() && this.itemsState.creationData() && !title){
      return this.itemsState.creationData().content;
    }
    else if (this.itemsState.editor() && title){
      return this.itemsState.editorData().title;
    }
    else if (this.itemsState.creation() && this.itemsState.creationData() && title){
      return this.itemsState.creationData().title;
    }
    else if (title) {
      return "title undefined";
    } else {
      return "";
    }
  }

  handleEdition(contentValue:string, title:boolean = false){
    const data = () => ({
      ...this.itemsState.editorData(), 
      content:!title ? contentValue : this.itemsState.editorData().content,
      title:!title ? this.itemsState.editorData().title : contentValue,
      modificationDate:new Date().toString()
    });
    this.itemsState.editorData.set(data());
  }

  handleCreation(contentValue:string, title:boolean = false){
    const date = new Date().toString();
    const creationData = this.itemsState.creationData() ?? {content:"", title:"title undefined"};
    const data = () => ({
      ...creationData,
      id: creationData.id ?? generateId(),
      modificationDate: date,
      title: title ? contentValue : creationData.title,
      content:!title ? contentValue : creationData.content});
    this.itemsState.creationData.set(data());
  }

  ngAfterViewInit() {
    this.viewInit = true;
    this.editorElement.nativeElement.value = this.previousData();
    this.titleInputValue = this.previousData(true);
    this.editorElement.nativeElement.addEventListener('input', (event:Event)=>{
      const contentValue = (event.target as HTMLTextAreaElement).value;
      this.itemsState.editor() ? this.handleEdition(contentValue) : undefined;
      this.itemsState.creation() ? this.handleCreation(contentValue) : undefined;
    });
    this.editorElement.nativeElement.focus();
  }
}
