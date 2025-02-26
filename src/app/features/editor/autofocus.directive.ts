import { Directive, ElementRef, AfterViewInit, effect } from '@angular/core';
import { ItemsStateService } from '@app/core/items-state.service';

@Directive({
  selector: '[appAutofocus]',
  standalone: true
})
export class AutofocusDirective implements AfterViewInit {

  constructor(private el: ElementRef, private itemsState: ItemsStateService) {
    effect(() => {
      if (this.itemsState.editor()) {
        this.el.nativeElement.focus();
      }
    });
  }

  ngAfterViewInit() {
    setTimeout(() => this.el.nativeElement.focus(), 0);
  }
}
