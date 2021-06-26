import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ServiciojuntarService } from '../../serviciojuntar.service';

@Component({
  selector: 'app-miconsulta',
  templateUrl: './miconsulta.component.html',
  styleUrls: ['./miconsulta.component.css']
})
export class MiconsultaComponent implements OnInit  
{
  @ViewChild('divcon', {static:true}) divcon:ElementRef;
  valor: string; 

  constructor(ele:ElementRef, private servicio:ServiciojuntarService) 
  { 
    this.divcon = ele;
    this.valor = ''; 
  }
  
  ngOnInit(): void 
  {
    this.divcon.nativeElement.contentEditable = 'true';
    this.valor = this.divcon.nativeElement.innerText.trim(); 
    // console.log(this.valor);  
    this.servicio.serMical.subscribe(data => {
      console.log('-> ', data); 
    });
    this.servicio.serMihor.subscribe(data => {
      console.log('~~', data); 
    }); 
  }
}
