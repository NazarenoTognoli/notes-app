  import { Injectable } from '@angular/core';

  import { LogicService } from '@app/services/logic.service';

  @Injectable({
    providedIn: 'root'
  })
  export class InputService {

    constructor(private logicService: LogicService) {}

    inputeCreate(text: string):void {
      this.logicService.createItem(text);
    }
    inputUpdate(id:number, text:string):void {
      this.logicService.updateItem({id:id, text:text});
    }
    inputDelete(id:number):void {
      this.logicService.deleteItem(id);
    }
    inputRead(id:number):void {
      this.logicService.readItem(id);
    }

  }
