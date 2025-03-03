//originalWidth + IF DIRECTION === RIGHT OR BOTTOM. - IF DIRECTION === LEFT OR TOP.
import { Component, AfterViewInit, effect, ElementRef, Host, signal} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { EditorService } from './editor.service';
import { GlobalService } from '@app/core/global.service';
import { ItemsSyncService } from '../items-container/items-sync.service';

import { generateId } from '@app/shared/models/item.model';

import { AutofocusDirective } from '@app/features/editor/autofocus.directive';

import { ResizeComponent } from '../resize/resize.component';

import { toPixels } from '@app/shared/utils/units-conversion';

@Component({
  selector: 'app-editor',
  standalone: true,
  imports: [CommonModule, FormsModule, AutofocusDirective, ResizeComponent],
  templateUrl: './editor.component.html',
  styleUrl: './editor.component.scss'
})
export class EditorComponent implements AfterViewInit {

  //primaryElementWidth = primaryElementWidth - (event.clientX - startPositionX);
  
  //secondaryElementWidth: allWIdth - primaryElementWidth;

  viewInit = false;
  titleInputValue:string = "";
  contentInputValue:string = "";

  constructor(
    private itemsSync:ItemsSyncService,
    public editorService:EditorService,
    @Host() public hostElement: ElementRef,
    public global:GlobalService){
    effect(()=>{
      if (this.viewInit && (this.editorService.editor() || this.editorService.creation())){ 

        this.contentInputValue = this.previousData(); 

        this.titleInputValue = this.previousData(true);
      
      }
    });
  }

  getCurrentWidth = () => this.hostElement.nativeElement.getBoundingClientRect().width;

  onTitleInput(event: Event): void {
    const inputValue = (event.target as HTMLInputElement).value;
    
    if (this.editorService.editor()) {
      this.handleEdition({ value: inputValue, isTitle: true });
    }
    
    if (this.editorService.creation()) {
      this.handleCreation({ value: inputValue, isTitle: true });
    }
  } 

  onContentInput(event: Event): void {
    const inputValue = (event.target as HTMLTextAreaElement).value;
    
    if (this.editorService.editor()) {
      this.handleEdition({ value: inputValue });
    }
    
    if (this.editorService.creation()) {
      this.handleCreation({ value: inputValue });
    }
  }


  previousData(title:boolean = false):string {
    if(this.editorService.editor() && !title){
      return this.editorService.editorData().content;
    }
    else if (this.editorService.creation() && this.editorService.creationData() && !title){
      return this.editorService.creationData().content;
    }
    else if (this.editorService.editor() && title){
      return this.editorService.editorData().title;
    }
    else if (this.editorService.creation() && this.editorService.creationData() && title){
      return this.editorService.creationData().title;
    }
    else if (title) {
      return "";
    } else {
      return "";
    }
  }

  handleEdition({ value, isTitle = false }: { value: string; isTitle?: boolean }): void {
    const { editorData } = this.editorService;
    const { content, title } = editorData();  

    const updatedData = {
      ...editorData(),
      content: isTitle ? content : value,
      title: isTitle ? value : title,
      modificationDate: new Date().toString()
    };  

    editorData.set(updatedData);
  } 

  handleCreation({ value, isTitle = false }: { value: string; isTitle?: boolean }): void {
    const { creationData } = this.editorService;
    const currentData = creationData() ?? { content: "", title: "" };
    if (!currentData.title) currentData.title = "Title Undefined";
    const { id, content, title } = currentData;
    
    const updatedData = {
      ...currentData,
      id: generateId(),
      modificationDate: new Date().toString(),
      title: isTitle ? value : currentData.title,
      content: isTitle ? content : value
    };  

    creationData.set(updatedData);
  }


  ngAfterViewInit() {
    if(!this.editorService.editorWidthPxPreviousState){
      this.editorService.editorWidthPxState.set(toPixels(40));
    } else {
      this.editorService.editorWidthPxState.set(this.editorService.editorWidthPxPreviousState);
    }
    this.editorService.editorWidthPxCurrent = this.getCurrentWidth;
    this.viewInit = true;
    setTimeout(()=>{
      this.contentInputValue = this.previousData();
      this.titleInputValue = this.previousData(true);
    })
  }
}
  