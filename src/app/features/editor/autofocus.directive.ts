import { Directive, ElementRef, AfterViewInit, effect } from '@angular/core';
import { EditorService } from './editor.service';
@Directive({
  selector: '[appAutofocus]',
  standalone: true
})
export class AutofocusDirective implements AfterViewInit {

  constructor(private el: ElementRef, private editor:EditorService) {
    effect(() => {
      if (this.editor.editor()) {
        this.el.nativeElement.focus();
      }
    });
  }

  ngAfterViewInit() {
    setTimeout(() => this.el.nativeElement.focus(), 0);
  }
}
