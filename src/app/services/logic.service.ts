import { Injectable } from '@angular/core';
/*1. Overview of localStorage
localStorage.setItem(key, value): Stores a key-value pair. The value must be a string.
localStorage.getItem(key): Retrieves the value associated with a key.
localStorage.removeItem(key): Removes a key-value pair.
localStorage.clear(): Clears all stored key-value pairs.
Since localStorage only supports strings, objects and arrays must be converted to strings using JSON.stringify() before storing, and parsed back with JSON.parse() when retrieving.*/
@Injectable({
  providedIn: 'root'
})
export class LogicService {
  constructor() {}
  
}
