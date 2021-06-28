import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms'; 
import { ServpostlogeoService } from './../../servpostlogeo.service';
import { ServiciojuntarService } from './../../serviciojuntar.service';
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-logeo',
  templateUrl: './logeo.component.html',
  styleUrls: ['./logeo.component.css']
})

export class LogeoComponent implements OnInit 
{
  @ViewChild('ingresos', {static:false}) ingresos:ElementRef; 
  @ViewChild('mensajelog', {static:true}) mensajelog:ElementRef; 
  @ViewChild('consul', {static:true}) consul:ElementRef; 
  @ViewChild('divbotones', {static:true}) divbotones:ElementRef;
  @ViewChild('divinputs', {static:true}) divinputs:ElementRef;
  @ViewChild('menload', {static:true}) menload:ElementRef; 
  @ViewChild('mentit', {static:true}) mentit:ElementRef; 
  @ViewChild('mencue', {static:true}) mencue:ElementRef; 
  @ViewChild('menreg', {static:true}) menreg:ElementRef; 
  @ViewChild('mennue', {static:true}) mennue:ElementRef; 
  @ViewChild('regresar', {static:true}) regresar:ElementRef; 
  @ViewChild('rehacer', {static:true}) rehacer:ElementRef; 
  imagen:string;
  fecha:string;  
  hora:string; 
  user:FormGroup; 
  _fb:FormBuilder; 

  constructor(private servjun:ServiciojuntarService, private servpost:ServpostlogeoService, private router: Router, ele:ElementRef) 
  { 
    this.imagen = '';
    this.fecha = '';
    this.hora = ''; 
    this.user = new FormGroup({});
    this._fb = new FormBuilder; 
    this.user.controls;
    this.mensajelog = ele;
    this.ingresos = ele;
    this.consul = ele; 
    this.divbotones = ele; 
    this.divinputs = ele; 
    this.menload = ele; 
    this.mentit = ele; 
    this.mencue = ele; 
    this.menreg = ele; 
    this.mennue = ele; 
    this.regresar = ele; 
    this.rehacer = ele;  
  }
  
  // protected createform() {
  //   this.user = new FormGroup({
  //     nombres: new FormControl('', Validators.required),
  //     apellidos: new FormControl('', Validators.required),
  //     dni: new FormControl('', Validators.compose([
  //       Validators.required, 
  //       Validators.pattern('^[0-9]{8}$')
  //     ])),  
  //     telefono: new FormControl('', Validators.required)
  //   });
  // }
  
  protected createform() 
  {
    this.user = this._fb.group({ 
      dni: ["", [Validators.required, Validators.nullValidator, Validators.pattern('^[0-9]{8}$')]], 
      telefono: ["", [Validators.required, Validators.nullValidator, Validators.minLength(1), Validators.pattern('^[0-9]+$')]],
      paci: [''],
      consul: ['']
    });
  }
  
  // private validaDni(control:AbstractControl) {
  //   let dni = control.value;
  //   let error = null;
  //   let dnit = dni.toString();
  //   console.log("--> " + dnit);    
  // }

  get f()
  {
    return this.user.controls;
  }

  logeando() 
  {
    if(this.user.valid)
    {
      //cargar pre-load 
      this.divbotones.nativeElement.style.display = 'none'; 
      this.divinputs.nativeElement.style.display = 'none'; 
      this.menload.nativeElement.style.display = 'block'; 
      this.mensajelog.nativeElement.style.display = 'block'; 
      //console.log("bienvenido");
 
      this.servpost.post(`http://localhost/odontologica/php/logeando.php`, { 
        lafecha: this.fecha, 
        lahora: this.hora, 
        laconsulta: this.consul.nativeElement.value, 
        eldni: this.user.controls['dni'].value,
        eltelefono: this.user.controls['telefono'].value, 
        // laconsulta: this.user.controls['consul'].value,
        elpaciente: this.user.controls['paci'].value  
      })
      .subscribe(rpta => {
        let aux =  Object.values(rpta); 
        //quitar load 
        this.menload.nativeElement.style.display = 'none';
        if(aux[0] == 'correcto') 
        { //console.log("respuesta php: ", aux); 
          this.mentit.nativeElement.innerHTML = "SU CITA FUE CONFIRMADA"; 
          this.mencue.nativeElement.innerHTML = "<b>DNI:</b> "  + aux[1] + "<br>"; 
          this.mencue.nativeElement.innerHTML += "<b>Nombre:</b> " + aux[2] + "<br>";
          this.mencue.nativeElement.innerHTML += "<b>A.Paterno:</b> " + aux[3] + "<br>"; 
          this.mencue.nativeElement.innerHTML += "<b>A.Materno:</b> " + aux[4] + "<br>";
          this.mencue.nativeElement.innerHTML += "<b>Telefono:</b> " + aux[5] + "<br>";
          this.mencue.nativeElement.innerHTML += "<b>Fecha:</b> " + aux[6] + "<br>";
          this.mencue.nativeElement.innerHTML += "<b>Hora:</b> " + aux[7] + "<br><br>"; 
          this.mennue.nativeElement.style.display = 'none';
          this.menreg.nativeElement.style.display = 'block'; 
        } 
        else 
        { //console.log(aux);  
          if(aux[0] == 'reservada')
            this.mentit.nativeElement.innerHTML = "FEHCA YA RESERVADA / CAMBIE HORA O FECHA";
          else
            this.mentit.nativeElement.innerHTML = "INGRESE SUS DATOS CORRECTAMENTE";
          
          this.mencue.nativeElement.innerHTML = "<b>DNI:</b> "  + aux[1] + "<br>"; 
          this.mencue.nativeElement.innerHTML += "<b>Telefono:</b> " + aux[2] + "<br>";
          this.mencue.nativeElement.innerHTML += "<b>Fecha:</b> " + aux[3] + "<br>"; 
          this.mencue.nativeElement.innerHTML += "<b>Hora:</b> " + aux[4] + "<br><br>"; 
          this.menreg.nativeElement.style.display = 'none'; 
          this.mennue.nativeElement.style.display = 'block'; 
        } 
      });  
    } 
  }

  limpia() 
  { 
    this.user.controls['dni'].setValue("");
    this.user.controls['telefono'].setValue("");
  }
  
  ngOnInit(): void 
  {
    this.regresar.nativeElement.addEventListener('click', () => {
      this.router.navigateByUrl('/'); 
    });
    //
    this.rehacer.nativeElement.addEventListener('click', () => {
      this.divbotones.nativeElement.style.display = 'block'; 
      this.divinputs.nativeElement.style.display = 'block'; 
      this.mensajelog.nativeElement.style.display = 'none'; 
    });
    // 
    this.consul.nativeElement.maxLength = '500'; 
    this.imagen = '../assets/imagenes/transp.png';
    //capturar formulario  
    this.createform();
    //recibiendo fecha y hora
    this.servjun.serMical.subscribe(data => { 
      // console.log(data); 
      this.fecha = data; 
    }); 
    this.servjun.serMihor.subscribe(data => { 
      // console.log(data);
      this.hora = data; 
    }); 
  }
}
