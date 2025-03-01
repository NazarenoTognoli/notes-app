import { Injectable, signal, effect, OnInit, computed } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ResizeService implements OnInit{

  primaryElementCurrentWidth = () => 0;

  constructor(){
    window.addEventListener('resize',this.handleResize);
  }

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

  handleResize = ()=> {
    const rawValuePx = this.primaryElementCurrentWidth();
    this.primaryElementWidthPx.set(rawValuePx);
    if (rawValuePx >= (window.innerWidth - 400) && this.primaryElementWidthPx()) {
      this.primaryElementWidthPx.set(window.innerWidth - 400);
    }
    else if(rawValuePx <= 400 && this.primaryElementWidthPx()){
      this.primaryElementWidthPx.set(400);
    }
  }
  ngOnInit(): void {}
}
