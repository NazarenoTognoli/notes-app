import { Injectable } from '@angular/core';

let items = [
  {id: 1, content: "Items number 1", title:"Item number 1 title"},
  {id: 2, content: "Items number 2", title:"Item number 2 title"},
  {id: 3, content: "Items number 3", title:"Item number 3 title"},
  {id: 4, content: "Items number 4", title:"Item number 4 title"},
  {id: 5, content: "Items number 5", title:"Item number 5 title"},
  {id: 6, content: "Items number 6", title:"Item number 6 title"},
  {id: 7, content: "Items number 7", title:"Item number 7 title"},
]

@Injectable({
  providedIn: 'root'
})
export class GetItemsService {

  getItems(){
    return items;
  }
  constructor() { }
}
