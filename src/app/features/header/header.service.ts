import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {
  delButtonEnabled:boolean = false;
  constructor() { }
}
