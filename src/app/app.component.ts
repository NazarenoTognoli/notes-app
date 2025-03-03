//ANGULAR
import { CommonModule } from '@angular/common';
import { Component, signal, effect, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
//LIBRARIES
import { of, from } from 'rxjs';
import { concatMap, delay } from 'rxjs/operators';
//SERVICES
import { ItemsSyncService } from './features/items-container/items-sync.service';
import { GlobalService } from './core/global.service';
import { EditorService } from './features/editor/editor.service';
import { SearchService } from './features/search/search.service';
import { ItemsContainerService } from './features/items-container/items-container.service';
//ANGULAR MATERIAL
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatGridListModule} from '@angular/material/grid-list';
//COMPONENTS
import { ItemComponent} from '@app/features/item/item.component';
import { HeaderComponent } from '@app/features/header/header.component';
import { EditorComponent } from './features/editor/editor.component';
import { ItemsContainerComponent } from './features/items-container/items-container.component';
//MODELS
import { Item, ReactiveItem, dummyDatabase } from '@app/shared/models/item.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet, 
    MatButtonModule, 
    MatIconModule, 
    ItemComponent, 
    CommonModule, 
    MatGridListModule,
    HeaderComponent,
    EditorComponent,
    ItemsContainerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  constructor(public itemsSync: ItemsSyncService, 
    public global:GlobalService,
    public editor:EditorService,
    public search:SearchService,
    public itemsContainer:ItemsContainerService){}

  ngOnInit(){
    this.itemsSync.refreshItems();
  }
  
}