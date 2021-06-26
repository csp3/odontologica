import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit 
{
  @ViewChild('entrar', {static:true}) entrar:ElementRef; 

  constructor(private ele:ElementRef, private router:Router) 
  {
    this.entrar = ele;
  }

  entrarcon()
  {
    this.router.navigateByUrl('/reserva');
  }

  ngOnInit(): void 
  {
    this.entrar.nativeElement.addEventListener('click', this.entrarcon.bind(this));
  }
}
