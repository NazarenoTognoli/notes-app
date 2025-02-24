//ANGULAR
import { CommonModule } from '@angular/common';
import { Component, signal, effect, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
//LIBRARIES
import { of, from } from 'rxjs';
import { concatMap, delay } from 'rxjs/operators';
//SERVICES
import { ItemsSyncService } from './core/items-sync.service';
import { ItemsStateService } from '@app/core/items-state.service';
//ANGULAR MATERIAL
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatGridListModule} from '@angular/material/grid-list';
//COMPONENTS
import { ItemComponent} from '@app/features/item/item.component';
import { HeaderComponent } from '@app/features/header/header.component';
import { EditorComponent } from './features/editor/editor.component';
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
    EditorComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  constructor(public itemsSync: ItemsSyncService, public itemsState: ItemsStateService){}

  ngOnInit(){
    this.itemsSync.refreshItems();
  }
}