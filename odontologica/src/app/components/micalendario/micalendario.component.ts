import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ServiciojuntarService } from '../../serviciojuntar.service'; 

@Component({
  selector: 'app-micalendario',
  templateUrl: './micalendario.component.html',
  styleUrls: ['./micalendario.component.css']
})

export class MicalendarioComponent implements OnInit 
{
  @ViewChild('calAnterior', {static:true}) calAnterior:ElementRef;
  @ViewChild('idmes', {static:true}) idmes:ElementRef;
  @ViewChild('calSiguiente', {static:true}) calSiguiente:ElementRef;
  @ViewChild('tablaCalMos', {static:true}) tablaCalMos:ElementRef; 
  d:Date;
  mes:any = [];
  numdias:any = [];  
  mesa:number;
  anioa:number; 
  valordia:string; 
  valorfecha:string; // valor a enviar 
  diaactual:number; 

  //captura valores para validar antes de enviar 
  arraydias = {
    filas: new Array(),
    columas: new Array(),
    valor: new Array() 
  }; 

  /*****/ 
  constructor( ele: ElementRef, private servicio:ServiciojuntarService) 
  { 
    this.tablaCalMos = ele; 
    this.calAnterior = ele; 
    this.calSiguiente = ele; 
    this.idmes = ele; 
    this.d = new Date(); 
    this.mes = ["ENERO", "FEBRERO", "MARZO", "ABRIL", "MAYO", "JUNIO", "JULIO", "AGOSTO", "SETIEMBRE", "OCTUBRE", "NOVIEMBRE", "DICIEMBRE"];
    this.numdias = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    this.mesa = this.d.getMonth(); 
    this.anioa = this.d.getFullYear(); 
    this.valordia = '';
    this.valorfecha = ''; 
    this.diaactual = this.d.getDate();   
  }

  /*****/ 
  diaActual()
  {
    let sw = 0;
    for (let i = 0; i < 6; i++) 
    {
      for (let j = 0; j < 7; j++) 
      {
        if (this.tablaCalMos.nativeElement.rows[i].cells[j].innerHTML.trim() == this.diaactual.toString())
        {
          this.tablaCalMos.nativeElement.rows[i].cells[j].style.border = '1px solid red';
          sw = 1;
          break; 
        }
        if (sw == 1) break; 
      }
    }
  }

  /*****/
  nombreMes(ma:number)
  {
    this.idmes.nativeElement.innerHTML = this.mes[ma] + '-' + this.anioa;
  }
  
  /*****/
  calcular (ma:number, aa:number)
  {
    let fila = 0
    let di = "";
    let filacolumna; 

    //reseteando 
    this.arraydias = {
      filas: new Array(),
      columas: new Array(),
      valor: new Array() 
    };
    
    //anio bisiesto para numdias
    (aa % 4 == 0) ? this.numdias[1] = 29 : this.numdias[1] = 28;
    
    //nombres de mes-anio
    this.nombreMes(ma);

    for (let i = 1; i <= this.numdias[ma]; i++) 
    {
      (i < 10) ? di = "0" + i : di = "" + i;
      var d1 = new Date(aa + "/" + (ma + 1) + "/" + di);
      if (d1) 
      {
        filacolumna = this.tablaCalMos.nativeElement.rows[fila].cells[d1.getDay()]; 
        filacolumna.innerHTML = d1.getDate() + filacolumna.innerHTML; 
      }
    
      //saltar otra fila 
      ((d1.getDay() + 1) % 7 == 0) ? fila++ : fila = fila;
    }

    // capturo para validar antes de enviar
    for (let i = 0; i < 6; i++) 
    {
      for (let j = 0; j < 7; j++) 
      {
        this.arraydias.filas.push(i);  
        this.arraydias.columas.push(j);
        this.arraydias.valor.push(this.tablaCalMos.nativeElement.rows[i].cells[j].innerText);  
      } 
    } 
  }

  /*****/ 
  public mesSigue() : void 
  {
    this.limpiarTabla(); 
    
    //si llega a diciembre y sigue
    if (this.mesa + 1 < 12) 
    {
      this.mesa = this.mesa + 1;
    }
    else 
    {
      this.mesa = 0;
      this.anioa = this.anioa + 1;
    }
    
    this.calcular(this.mesa, this.anioa);
    this.diaActual(); 
  }

  /*****/ 
  mesAntes()  
  {
    this.limpiarTabla(); 
    
    if (this.mesa > 0) 
    {
      this.mesa = this.mesa - 1;
    }
    else 
    {
      this.mesa = 11;
      this.anioa = this.anioa - 1;
    }
    
    this.calcular(this.mesa, this.anioa);
    this.diaActual(); 
  }

  /*****/ 
  public limpiarTabla () : void 
  {
    for (let i = 0; i < 6; i++) 
    {
      for (let j = 0; j < 7; j++) 
      {
        this.tablaCalMos.nativeElement.rows[i].cells[j].innerHTML = ''; 
        this.tablaCalMos.nativeElement.rows[i].cells[j].style.background = '#ffffff'; 
        this.tablaCalMos.nativeElement.rows[i].cells[j].style.border = '1px solid #f2e3e3';  
      }
    }
  }
  
  /*****/
  creareventos()
  {
    
    for (let i = 0; i < 6; i++) 
    {
      for (let j = 0; j < 7; j++) 
      {
        this.tablaCalMos.nativeElement.rows[i].cells[j].addEventListener('click', () => {
          this.limpiarTabla();
          this.calcular(this.mesa, this.anioa);
          this.valordia = this.arraydias.valor[7*i + j].trim(); 
          // no td sin dia 
          if(this.valordia != '')
          {
            this.valorfecha = this.valordia + '-' + this.idmes.nativeElement.innerText.trim();
            this.tablaCalMos.nativeElement.rows[i].cells[j].style.background = 'yellow'; 
            // console.log(this.valorfecha); 
            this.enviarValor(); 
          }
        });  
      } 
    } 
  }

  /*****/
  enviarValor()
  {
    this.servicio.serMical.emit({
      data: this.valorfecha 
    }); 
  }

  /*****/
  ngOnInit(): void 
  {
    this.calAnterior.nativeElement.addEventListener('click', this.mesAntes.bind(this));
    this.calSiguiente.nativeElement.addEventListener('click', this.mesSigue.bind(this)); 
    this.creareventos(); 
    this.calcular(this.mesa, this.anioa); 
    this.diaActual(); 
  }
}
