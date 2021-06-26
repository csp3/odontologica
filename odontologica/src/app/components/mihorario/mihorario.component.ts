import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ServiciojuntarService } from '../../serviciojuntar.service';

@Component({
  selector: 'app-mihorario',
  templateUrl: './mihorario.component.html',
  styleUrls: ['./mihorario.component.css']
})

export class MihorarioComponent implements OnInit 
{
  @ViewChild('horario', {static:true}) horario:ElementRef; 
  @ViewChild('horario2', {static:true}) horario2:ElementRef; 
  valor:string; 
  valores:Array<string> = ['08:00-AM','09:00-AM','10:00-AM','11:00-AM','12:00-PM','01:00-PM','02:30-PM','03:30-PM','04:30-PM','05:30-PM']
   
  constructor(private ele:ElementRef, private servicio:ServiciojuntarService) 
  { 
    this.horario = ele;
    this.horario2 = ele; 
    this.valor = '';
  }

  limpiarselect()
  {
    for(let i=0; i<4; i++)
    {
      this.horario.nativeElement.children[i].style.background = 'transparent'; 
    }

    for(let i=0; i<6; i++)
    {
      this.horario2.nativeElement.children[i].style.background = 'transparent'; 
    }
  }

  marcar(nom:string, n:number) 
  {
    if(nom == 'horario')
    {
      this.horario.nativeElement.children[n].style.background = '#ffff00';
    }

    if(nom == 'horario2')
    {
      this.horario2.nativeElement.children[n].style.background = '#ffff00';
    }
  }

  creareventos()
  {
    for (let i = 0; i < 4; i++) 
    {
      this.horario.nativeElement.children[i].addEventListener('click',()=>{
        this.limpiarselect();
        this.marcar('horario', i);
        this.valor = this.valores[i];
        //
        this.enviarValor(); 
      });
    }

    for (let i = 0; i < 6; i++) 
    {
      this.horario2.nativeElement.children[i].addEventListener('click',()=>{
        this.limpiarselect();
        this.marcar('horario2', i);
        this.valor = this.valores[4 + i];
        // console.log(this.valor); 
        this.enviarValor(); 
      });
    }
  }

  enviarValor()
  {
    this.servicio.serMihor.emit({
      data: this.valor  
    });
  }

  ngOnInit(): void 
  {
    this.horario.nativeElement.size = 7; 
    this.horario2.nativeElement.size = 7; 
    this.creareventos(); 
  }
}
