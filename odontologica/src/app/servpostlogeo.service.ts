import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 

@Injectable({
  providedIn: 'root'
})
export class ServpostlogeoService 
{
  constructor(private http:HttpClient) { }

  public post(url:string, body:any)
  {
    return this.http.post(url, body); 
  }
}
