import { Injectable, signal, effect, OnInit, computed } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ResizeService implements OnInit{

  toPixels(value:number){
    return value / 100 * window.innerWidth;
  }

  toPercentage(value:number){
    return value / window.innerWidth * 100;
  }
  isResizing:boolean = false;

  primaryElementWidthPxPrevious = 0;

  primaryElementWidthPx = signal<number>(0);

  secondaryElementWidthPx = () => window.innerWidth - this.primaryElementWidthPx();
  
  primaryElementWidthPct = computed(() => this.toPercentage(this.primaryElementWidthPx()));
  secondaryElementWidthPct = computed(() => this.toPercentage(this.secondaryElementWidthPx()));

  
  ngOnInit(): void {  }
  //[style.width.%]="resize.secondaryElementWidth()"
}
