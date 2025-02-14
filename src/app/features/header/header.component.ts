import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemsStateService } from '@app/core/items-state.service';

@Component({
  selector: '[app-header]',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  constructor(public itemsState: ItemsStateService){}
}
