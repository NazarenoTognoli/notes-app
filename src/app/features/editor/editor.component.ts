//originalWidth + IF DIRECTION === RIGHT OR BOTTOM. - IF DIRECTION === LEFT OR TOP.
import { Component, AfterViewInit, effect, ElementRef, Host, signal} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ItemsStateService } from '@app/core/items-state.service';
import { ItemsSyncService } from '@app/core/items-sync.service';
import { ResizeService } from '@app/core/resize.service';

import { generateId } from '@app/shared/models/item.model';

import { AutofocusDirective } from '@app/features/editor/autofocus.directive';

import { ResizeBarComponent } from '@app/features/resize-bar/resize-bar.component';

@Component({
  selector: 'app-editor',
  standalone: true,
  imports: [CommonModule, FormsModule, AutofocusDirective, ResizeBarComponent],
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
    public itemsState:ItemsStateService, 
    private itemsSync:ItemsSyncService, 
    @Host() public hostElement: ElementRef,
    public resize:ResizeService){
    effect(()=>{
      if (this.viewInit && (this.itemsState.editor() || this.itemsState.creation())){ 

        this.contentInputValue = this.previousData(); 

        this.titleInputValue = this.previousData(true);
      
      }
    });
  }

  getCurrentWidth = () => this.hostElement.nativeElement.getBoundingClientRect().width;

  onTitleInput(event: Event): void {
    const inputValue = (event.target as HTMLInputElement).value;
    
    if (this.itemsState.editor()) {
      this.handleEdition({ value: inputValue, isTitle: true });
    }
    
    if (this.itemsState.creation()) {
      this.handleCreation({ value: inputValue, isTitle: true });
    }
  } 

  onContentInput(event: Event): void {
    const inputValue = (event.target as HTMLTextAreaElement).value;
    
    if (this.itemsState.editor()) {
      this.handleEdition({ value: inputValue });
    }
    
    if (this.itemsState.creation()) {
      this.handleCreation({ value: inputValue });
    }
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
      return "Title Undefined";
    } else {
      return "";
    }
  }

  handleEdition({ value, isTitle = false }: { value: string; isTitle?: boolean }): void {
    const { editorData } = this.itemsState;
    const { content, title } = editorData();  

    const updatedData = {
      ...editorData(),
      content: isTitle ? content : value,
      title: isTitle ? value : title,
      modificationDate: new Date().toISOString()
    };  

    editorData.set(updatedData);
  } 

  handleCreation({ value, isTitle = false }: { value: string; isTitle?: boolean }): void {
    const { creationData } = this.itemsState;
    const currentData = creationData() ?? { content: "", title: "Title Undefined" };
    const { id, content, title } = currentData;
    
    const updatedData = {
      ...currentData,
      id: generateId(),
      modificationDate: new Date().toISOString(),
      title: isTitle ? value : title,
      content: isTitle ? content : value
    };  

    creationData.set(updatedData);
  }


  ngAfterViewInit() {
    if(!this.resize.primaryElementWidthPxPrevious){
      this.resize.primaryElementWidthPx.set(this.resize.toPixels(40));
    } else {
      this.resize.primaryElementWidthPx.set(this.resize.primaryElementWidthPxPrevious);
    }
    console.log(this.resize.secondaryElementWidthPct());
    console.log(this.resize.primaryElementWidthPct());
    setTimeout(()=>console.log(this.resize.secondaryElementWidthPct()), 2000);
    setTimeout(()=>console.log(this.resize.primaryElementWidthPct()), 2000);
    this.viewInit = true;
    setTimeout(()=>{
      this.contentInputValue = this.previousData();
      this.titleInputValue = this.previousData(true);
    })
  }
}
  