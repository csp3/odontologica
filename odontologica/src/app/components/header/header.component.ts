import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms'; 

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {
  public imagen:string;
  public user:FormGroup;
  public _fb:FormBuilder;

  constructor() { 
    this.imagen = ''; 
    this.user = new FormGroup({});
    this._fb = new FormBuilder; 
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
  
  protected createform() {
    this.user = this._fb.group({ 
      nombres: ["", [Validators.required, Validators.nullValidator, Validators.minLength(1), Validators.pattern('^[a-zA-Z ]+$')]], 
      apellidos: ["", [Validators.required, Validators.nullValidator, Validators.minLength(1), Validators.pattern('^[a-zA-Z ]+$')]], 
      dni: ["", [Validators.required, Validators.nullValidator, Validators.pattern('^[0-9]{8}$')]], 
      telefono: ["", [Validators.required, Validators.nullValidator, Validators.minLength(1), Validators.pattern('^[0-9]+$')]] 
    });
  }

  // private validaDni(control:AbstractControl) {
  //   let dni = control.value;
  //   let error = null;
  //   let dnit = dni.toString();
  //   console.log("--> " + dnit);    
  // }

  get f(){
    return this.user.controls;
  }

  logeando() {
    if(this.user.valid)
    {
      console.log("bienvenido");
    }
    // console.log(this.user.value);
  }

  limpiar() { 
    this.user.controls['nombres'].setValue("");  
    this.user.controls['apellidos'].setValue("");
    this.user.controls['dni'].setValue("");
    this.user.controls['telefono'].setValue("");
  }
  
  ngOnInit(): void {
    this.imagen = '../assets/imagenes/odonto.png';
    this.createform();
  }

}
