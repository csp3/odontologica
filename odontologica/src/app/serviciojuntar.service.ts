import { Injectable, EventEmitter, Output } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class ServiciojuntarService {
  @Output() serMihor:EventEmitter<any> = new EventEmitter(); 
  @Output() serMical:EventEmitter<any> = new EventEmitter(); 
 
  constructor() 
  { 
    ;
  }
}
