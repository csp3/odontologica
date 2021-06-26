import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reserva',
  templateUrl: './reserva.component.html',
  styleUrls: ['./reserva.component.css']
})

export class ReservaComponent implements OnInit 
{
  imagen:string; 

  constructor() 
  { 
    this.imagen = '';
  }

  ngOnInit(): void 
  {
    this.imagen = '../assets/imagenes/odonto2.png'; 
  }

}
