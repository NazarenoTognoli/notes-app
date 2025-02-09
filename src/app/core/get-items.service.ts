//============================NON ASYNC SIMULATOR=====================================

// import { Injectable } from '@angular/core';

// let items = [
//   {id: 1, content: "Items number 1", title:"Item number 1 title"},
//   {id: 2, content: "Items number 2", title:"Item number 2 title"},
//   {id: 3, content: "Items number 3", title:"Item number 3 title"},
//   {id: 4, content: "Items number 4", title:"Item number 4 title"},
//   {id: 5, content: "Items number 5", title:"Item number 5 title"},
//   {id: 6, content: "Items number 6", title:"Item number 6 title"},
//   {id: 7, content: "Items number 7", title:"Item number 7 title"},
// ]

// @Injectable({
//   providedIn: 'root'  
// })
// export class GetItemsService {

//   getItems(){
//     return items;
//   }
//   constructor() { }
// }

//=================================ASYNC SIMULATOR=============================================

import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { dummyDatabase, Item } from '@app/shared/models/item.model';

@Injectable({
  providedIn: 'root',
})
export class GetItemsService {

  constructor() {}

  getItems(): Observable<Promise<Item[]>> { //Observable<> is a class that shapes return
    // Simulate a server delay of 1 second before returning the data
    return of(dummyDatabase('get', { id: 0, content: '', creationDate: '', modificationDate: '' })); //Of creates the observer¿¿¿ //Pipe attaches a function to the return result
    //delay is an operator of rxjs which one integrates with pipe. 
  }
}

//==============================REAL EXAMPLE============================================

// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { delay } from 'rxjs/operators';

// @Injectable({
//   providedIn: 'root',
// })
// export class GetItemsService {
//   private apiUrl = 'https://api.ejemplo.com/items'; // URL del servidor

//   constructor(private http: HttpClient) {}

//   getItems(): Observable<Item[]> {
//     return this.http.get<Item[]>(this.apiUrl).pipe(delay(1000)); 
//      //The this.http.get method already returns an observable
//      //There is also .put, .post and .delete methods for handling server data. 
//   }
// }



